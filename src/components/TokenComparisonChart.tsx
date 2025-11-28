import React from 'react';
import type { Dataset } from '../datasets/types';

export type Format = 'json' | 'pretty-json' | 'yaml' | 'toon' | 'tron';

export interface FormatResult {
  id: Format;
  label: string;
  tokens: number;
  diff: number;
  percentage: number;
}

export interface ComparisonData {
  dataset: Dataset;
  results: FormatResult[];
  maxTokens: number;
}

const FORMAT_COLORS: Record<Format, string> = {
  'json': '#6366f1',       // Indigo
  'pretty-json': '#8b5cf6', // Purple
  'tron': '#06b6d4',       // Cyan
  'toon': '#10b981',       // Emerald  
  'yaml': '#f59e0b',       // Amber
};

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

interface TokenComparisonChartProps {
  comparison: ComparisonData;
  baselineFormat: Format;
}

export const TokenComparisonChart: React.FC<TokenComparisonChartProps> = ({ 
  comparison, 
  baselineFormat 
}) => {
  // Sort results from smallest to largest token count
  const sortedResults = [...comparison.results].sort((a, b) => a.tokens - b.tokens);

  return (
    <div style={{
      border: '1px solid var(--border-color)',
      borderRadius: '12px',
      padding: '1.5rem',
      backgroundColor: 'var(--bg-color)',
    }}>
      <h3 style={{ 
        margin: '0 0 1rem 0', 
        fontSize: '1.1rem',
        fontWeight: 600,
        color: 'var(--text-color)',
      }}>
        {comparison.dataset.label}
      </h3>
      <p style={{
        margin: '0 0 1.25rem 0',
        fontSize: '0.85rem',
        color: 'var(--text-color)',
        opacity: 0.7,
      }}>
        {`${comparison.dataset.description} ${comparison.dataset.analysis || ''}`}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {sortedResults.map(result => {
          const isTron = result.id === 'tron';
          return (
            <div 
              key={result.id} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem',
                padding: '0rem 0.5rem',
                marginLeft: '-0.75rem',
                marginRight: '-0.75rem',
                borderRadius: '8px',
                backgroundColor: isTron ? 'rgba(6, 182, 212, 0.1)' : 'transparent',
                borderLeft: isTron ? '3px solid #06b6d4' : '3px solid transparent',
              }}
            >
              {/* Format label */}
              <div style={{ 
                width: '90px', 
                fontSize: '0.85rem', 
                fontWeight: isTron ? 700 : 500,
                color: isTron ? '#06b6d4' : 'var(--text-color)',
                flexShrink: 0,
              }}>
                {result.label}
              </div>
              
              {/* Bar container */}
              <div style={{ 
                flex: 1, 
                height: '28px', 
                backgroundColor: 'var(--code-bg)',
                borderRadius: '6px',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Bar fill */}
                <div style={{
                  width: `${result.percentage}%`,
                  height: '100%',
                  backgroundColor: FORMAT_COLORS[result.id],
                  borderRadius: '6px',
                  transition: 'width 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: '0.75rem',
                  minWidth: 'fit-content',
                }}>
                  {result.percentage > 25 && (
                    <span style={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: '#fff',
                      textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                    }}>
                      {result.tokens.toLocaleString()}
                    </span>
                  )}
                </div>
                {/* Token count outside bar if bar is too small */}
                {result.percentage <= 25 && (
                  <span style={{
                    position: 'absolute',
                    left: `calc(${result.percentage}% + 8px)`,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--text-color)',
                  }}>
                    {result.tokens.toLocaleString()}
                  </span>
                )}
              </div>
              
              {/* Diff percentage */}
              <div style={{ 
                width: '65px', 
                textAlign: 'right',
                fontSize: '0.85rem',
                fontWeight: 500,
                flexShrink: 0,
              }}>
                {result.id === baselineFormat ? (
                  <span style={{ color: 'var(--text-color)', opacity: 0.5 }}>baseline</span>
                ) : (
                  <span style={{ color: getDiffColor(result.diff) }}>
                    {formatDiff(result.diff)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

