import React, { useState, useMemo, useRef } from 'react';
import { encodingForModel, Tiktoken } from 'js-tiktoken';
import { TRON } from '@tron-format/tron';
import * as TOON from '@toon-format/toon';
import { stringify as yamlStringify } from 'yaml';
import { Copy, Check, Shield, BarChart3 } from 'lucide-react';
import { presets, type Dataset } from '../lib/datasets';
import { DatasetDropdown, DatasetSourceInfo } from './DatasetDropdown';
import { TokenComparisonChart, type Format, type ComparisonData } from './TokenComparisonChart';

type DataMode = 'presets' | 'custom';

const FORMATS: { id: Format; label: string }[] = [
  { id: 'json', label: 'JSON' },
  { id: 'pretty-json', label: 'Pretty JSON' },
  { id: 'tron', label: 'TRON' },
  { id: 'toon', label: 'TOON' },
  { id: 'yaml', label: 'YAML' },
];

const TOKEN_COLORS = [
  '#c9908f', // muted red
  '#8db89a', // muted green
  '#8ea8c4', // muted blue
  '#89b3b8', // muted cyan
  '#b894b3', // muted magenta
  '#c4b87a', // muted yellow
  '#c9a383', // muted orange
  '#a094b8', // muted purple
];

interface ColoredToken {
  text: string;
  color: string;
}

// Tokenize text and assign colors to each token
const tokenizeWithColors = (text: string, enc: Tiktoken | null): ColoredToken[] => {
  if (!enc) return [{ text, color: 'inherit' }];
  
  const tokenIds = enc.encode(text);
  const result: ColoredToken[] = [];
  
  for (let i = 0; i < tokenIds.length; i++) {
    const tokenText = enc.decode([tokenIds[i]]);
    result.push({
      text: tokenText,
      color: TOKEN_COLORS[i % TOKEN_COLORS.length],
    });
  }
  
  return result;
};

// Component to render colored tokens with line numbers
const ColoredCodeBlock: React.FC<{ tokens: ColoredToken[]; showHighlighting: boolean }> = ({ tokens, showHighlighting }) => {
  // Split tokens into lines while preserving color information
  const lines: ColoredToken[][] = [];
  let currentLine: ColoredToken[] = [];
  
  for (const token of tokens) {
    // Handle tokens that contain newlines
    const parts = token.text.split('\n');
    for (let i = 0; i < parts.length; i++) {
      if (i > 0) {
        // Push current line and start a new one
        lines.push(currentLine);
        currentLine = [];
      }
      if (parts[i].length > 0 || (i === 0 && parts.length === 1)) {
        currentLine.push({ text: parts[i], color: token.color });
      }
    }
  }
  // Push the last line
  lines.push(currentLine);
  
  return (
    <code style={{ display: 'block', fontFamily: 'inherit' }}>
      {lines.map((lineTokens, lineIdx) => (
        <div key={lineIdx} style={{ display: 'flex' }}>
          <span style={{ 
            userSelect: 'none', 
            minWidth: '2em', 
            textAlign: 'right', 
            marginRight: '1em', 
            color: 'var(--text-color)',
            opacity: 0.4,
            flexShrink: 0 
          }}>
            {lineIdx + 1}
          </span>
          <span style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            {lineTokens.length === 0 ? ' ' : lineTokens.map((token, tokenIdx) => (
              <span 
                key={tokenIdx} 
                style={showHighlighting ? { 
                  backgroundColor: token.color,
                  color: getContrastColor(token.color),
                  borderRadius: '2px',
                } : undefined}
              >
                {token.text}
              </span>
            ))}
          </span>
        </div>
      ))}
    </code>
  );
};

// Get contrasting text color (black or white) based on background
const getContrastColor = (hexColor: string): string => {
  // Handle shorthand hex colors
  let hex = hexColor.replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  
  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5 ? '#000' : '#fff';
};

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        position: 'absolute',
        bottom: '0.5rem',
        right: '1rem',
        padding: '0.5rem',
        backgroundColor: copied ? 'var(--copy-success-bg, #dcfce7)' : 'var(--bg-color)',
        color: copied ? 'var(--copy-success-color, #166534)' : 'var(--text-color)',
        border: '1px solid var(--border-color)',
        borderRadius: '4px',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'all 0.2s',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: copied ? 1 : 0.8,
      }}
      title="Copy to clipboard"
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
};

export const PlaygroundPage: React.FC = () => {
  const [dataMode, setDataMode] = useState<DataMode>('presets');
  const [selectedDataset, setSelectedDataset] = useState<Dataset>(presets[0]);
  const [customJson, setCustomJson] = useState<string>('"Paste your JSON here"');
  const [baselineFormat, setBaselineFormat] = useState<Format>('json');
  const [enabledFormats, setEnabledFormats] = useState<Set<Format>>(
    new Set(['json', 'pretty-json', 'tron', 'toon'])
  );
  const [showTokenHighlighting, setShowTokenHighlighting] = useState(true);
  
  // Use ref to track last valid custom data
  const lastValidCustomDataRef = useRef<unknown>("Paste your JSON here");

  const toggleFormat = (formatId: Format) => {
    setEnabledFormats(prev => {
      const next = new Set(prev);
      if (next.has(formatId)) {
        next.delete(formatId);
      } else {
        next.add(formatId);
      }
      return next;
    });
  };

  const enc = useMemo(() => {
    try {
      return encodingForModel("gpt-5");
    } catch (e) {
      console.error("Failed to load tokenizer:", e);
      return null;
    }
  }, []);

  // Parse custom JSON and get current valid data + error
  const { customData, customJsonError } = useMemo(() => {
    if (dataMode !== 'custom') {
      return { customData: lastValidCustomDataRef.current, customJsonError: null };
    }
    try {
      const parsed = JSON.parse(customJson);
      lastValidCustomDataRef.current = parsed;
      return { customData: parsed, customJsonError: null };
    } catch (e) {
      // Return last valid data on error
      return { customData: lastValidCustomDataRef.current, customJsonError: (e as Error).message };
    }
  }, [customJson, dataMode]);

  // Get active data based on mode
  const activeData = dataMode === 'presets' ? selectedDataset.data : customData;

  const getFormattedString = (data: any, format: Format): string => {
    switch (format) {
      case 'json':
        return JSON.stringify(data);
      case 'pretty-json':
        return JSON.stringify(data, null, 2);
      case 'tron':
        return TRON.stringify(data);
      case 'toon':
        return TOON.encode(data);
      case 'yaml':
        return yamlStringify(data);
      default:
        return '';
    }
  };

  const results = useMemo(() => {
    if (activeData === undefined) return null;
    
    const baselineText = getFormattedString(activeData, baselineFormat);
    const baselineTokens = enc ? enc.encode(baselineText).length : 0;

    return FORMATS.map((fmt) => {
      const text = getFormattedString(activeData, fmt.id);
      const tokens = enc ? enc.encode(text).length : 0;
      const diff = baselineTokens > 0 ? ((tokens - baselineTokens) / baselineTokens) * 100 : 0;
      const coloredTokens = tokenizeWithColors(text, enc);
      
      return {
        ...fmt,
        text,
        tokens,
        diff,
        coloredTokens,
      };
    });
  }, [activeData, baselineFormat, enc]);

  const formatDiff = (diff: number) => {
    if (diff === 0) return '0%';
    const sign = diff > 0 ? '+' : '';
    return `${sign}${diff.toFixed(1)}%`;
  };

  const getDiffColor = (diff: number) => {
    if (diff === 0) return 'var(--text-color)';
    if (diff > 0) return '#ef4444'; // Red for increase
    return '#22c55e'; // Green for decrease
  };

  // Calculate token comparison data for all presets
  const presetComparisons = useMemo((): ComparisonData[] | null => {
    if (!enc) return null;
    
    return presets.map(preset => {
      const formatResults = FORMATS.map(fmt => {
        const text = getFormattedString(preset.data, fmt.id);
        const tokens = enc.encode(text).length;
        return { ...fmt, tokens };
      });
      
      const baselineResult = formatResults.find(r => r.id === baselineFormat)!;
      const baselineTokens = baselineResult.tokens;
      const maxTokens = Math.max(...formatResults.map(r => r.tokens));
      
      return {
        dataset: preset,
        results: formatResults.map(r => ({
          ...r,
          diff: baselineTokens > 0 ? ((r.tokens - baselineTokens) / baselineTokens) * 100 : 0,
          percentage: (r.tokens / maxTokens) * 100,
        })),
        maxTokens,
      };
    });
  }, [enc, baselineFormat]);

  return (
    <div className="markdown-body" style={{ maxWidth: '1400px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1>Playground</h1>
        <p>Compare token usage across different formats using GPT-5 tokenization (o200k_base).</p>

        {/* Data Mode Toggle */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ 
            display: 'inline-flex', 
            borderRadius: '8px', 
            border: '1px solid var(--border-color)',
            overflow: 'hidden'
          }}>
            <button
              onClick={() => setDataMode('presets')}
              style={{
                padding: '0.6rem 1.2rem',
                border: 'none',
                cursor: 'pointer',
                fontWeight: dataMode === 'presets' ? 600 : 400,
                backgroundColor: dataMode === 'presets' ? 'var(--primary-color)' : 'transparent',
                color: dataMode === 'presets' ? '#fff' : 'var(--text-color)',
                transition: 'all 0.2s',
              }}
            >
              Presets
            </button>
            <button
              onClick={() => setDataMode('custom')}
              style={{
                padding: '0.6rem 1.2rem',
                border: 'none',
                borderLeft: '1px solid var(--border-color)',
                cursor: 'pointer',
                fontWeight: dataMode === 'custom' ? 600 : 400,
                backgroundColor: dataMode === 'custom' ? 'var(--primary-color)' : 'transparent',
                color: dataMode === 'custom' ? '#fff' : 'var(--text-color)',
                transition: 'all 0.2s',
              }}
            >
              Custom Data
            </button>
          </div>
        </div>

        {dataMode === 'presets' && (
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Dataset (Select One)</label>
            <DatasetDropdown
              datasets={presets}
              selected={selectedDataset}
              onSelect={setSelectedDataset}
            />
            <DatasetSourceInfo dataset={selectedDataset} />
          </div>
        )}

        {/* Custom Data Input */}
        {dataMode === 'custom' && (
          <div style={{ marginBottom: '1.5rem' }}>
            {/* Privacy Admonition */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              padding: '1rem',
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '8px',
              marginBottom: '1rem',
            }}>
              <Shield size={20} style={{ color: '#22c55e', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontWeight: 600, color: '#22c55e', marginBottom: '0.25rem' }}>
                  Privacy Notice
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                  Your data never leaves the browser. All processing is done locally using client-side JavaScript.
                </div>
              </div>
            </div>

            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
              Paste your JSON
            </label>
            <textarea
              value={customJson}
              onChange={(e) => setCustomJson(e.target.value)}
              placeholder='{"key": "value"}'
              style={{
                width: '100%',
                minHeight: '150px',
                padding: '0.75rem',
                borderRadius: '8px',
                border: customJsonError ? '1px solid #ef4444' : '1px solid var(--border-color)',
                backgroundColor: 'var(--code-bg)',
                color: 'var(--text-color)',
                fontFamily: "'Fira Code', 'Consolas', monospace",
                fontSize: '0.9rem',
                resize: 'vertical',
                boxSizing: 'border-box',
              }}
            />
            {customJsonError && (
              <div style={{ 
                color: '#ef4444', 
                fontSize: '0.85rem', 
                marginTop: '0.5rem' 
              }}>
                Invalid JSON: {customJsonError}
              </div>
            )}
          </div>
        )}

        {/* Format Toggle Buttons with Baseline Format */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            gap: '0.5rem',
            alignItems: 'center',
          }}>
            {FORMATS.map((fmt) => {
              const isEnabled = enabledFormats.has(fmt.id);
              return (
                <button
                  key={fmt.id}
                  onClick={() => toggleFormat(fmt.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    backgroundColor: isEnabled ? 'var(--primary-color)' : 'var(--border-color)',
                    color: isEnabled ? '#fff' : 'var(--text-color)',
                    transition: 'all 0.15s ease',
                    opacity: isEnabled ? 1 : 0.7,
                  }}
                >
                  {fmt.label}
                </button>
              );
            })}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {/* Baseline Format */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <label style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>Baseline:</label>
              <select
                value={baselineFormat}
                onChange={(e) => setBaselineFormat(e.target.value as Format)}
                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', minWidth: '120px' }}
              >
                {FORMATS.map((fmt) => (
                  <option key={fmt.id} value={fmt.id}>
                    {fmt.label}
                  </option>
                ))}
              </select>
            </div>
          
            {/* Token Highlighting Toggle */}
            <div 
              onClick={() => setShowTokenHighlighting(!showTokenHighlighting)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              <span style={{ fontWeight: 600, whiteSpace: 'nowrap', fontSize: '0.9rem' }}>Highlight Tokens</span>
              <div
                style={{
                  width: '44px',
                  height: '24px',
                  backgroundColor: showTokenHighlighting ? 'var(--primary-color)' : 'var(--border-color)',
                  borderRadius: '12px',
                  position: 'relative',
                  transition: 'background-color 0.2s',
                }}
              >
                <div style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#fff',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '2px',
                  left: showTokenHighlighting ? '22px' : '2px',
                  transition: 'left 0.2s',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {results && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {results.filter((res) => enabledFormats.has(res.id)).map((res) => (
            <div key={res.id} style={{ 
              border: '1px solid var(--border-color)', 
              borderRadius: '8px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ 
                padding: '1rem', 
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontWeight: 600 }}>{res.label}</span>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontWeight: 'bold', display: 'block' }}>{res.tokens.toLocaleString()} tokens</span>
                  {res.id !== baselineFormat && (
                    <span style={{ 
                      fontSize: '0.85em', 
                      color: getDiffColor(res.diff),
                      fontWeight: 500 
                    }}>
                      {formatDiff(res.diff)}
                    </span>
                  )}
                  {res.id === baselineFormat && (
                    <span style={{ fontSize: '0.85em', opacity: 0.7 }}>
                      (Baseline)
                    </span>
                  )}
                </div>
              </div>
              <div style={{ flex: 1, position: 'relative' }}>
                <div style={{ 
                  margin: 0, 
                  height: '400px', 
                  overflow: 'auto',
                  borderRadius: 0,
                  fontSize: '0.85rem',
                  fontFamily: 'monospace',
                  backgroundColor: 'var(--code-bg)',
                }}>
                  <ColoredCodeBlock tokens={res.coloredTokens} showHighlighting={showTokenHighlighting} />
                </div>
                <CopyButton text={res.text} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Token Comparison Charts Section */}
      {presetComparisons && (
        <div style={{ marginTop: '4rem', maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem',
            marginBottom: '1.5rem',
            borderBottom: '2px solid var(--border-color)',
            paddingBottom: '1rem',
          }}>
            <BarChart3 size={28} style={{ color: 'var(--primary-color)' }} />
            <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Token Comparison Across All Datasets</h2>
          </div>
          <p style={{ 
            marginBottom: '2rem', 
            color: 'var(--text-color)', 
            opacity: 0.8,
            fontSize: '0.95rem',
          }}>
            Compare how each format performs across different dataset types. Lower token counts mean more efficient representation.
          </p>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', 
            gap: '1.5rem' 
          }}>
            {presetComparisons.map(comparison => (
              <TokenComparisonChart 
                key={comparison.dataset.name} 
                comparison={comparison} 
                baselineFormat={baselineFormat}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
