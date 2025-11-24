import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ExternalLink, Calendar } from 'lucide-react';
import type { Dataset } from '../lib/datasets';

// Custom Dataset Dropdown with label + description
export const DatasetDropdown: React.FC<{
  datasets: Dataset[];
  selected: Dataset;
  onSelect: (ds: Dataset) => void;
}> = ({ datasets, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      {/* Dropdown trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          width: '100%',
          padding: '0.75rem 1rem',
          backgroundColor: 'var(--dropdown-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'border-color 0.2s, box-shadow 0.2s',
          boxShadow: isOpen ? '0 0 0 2px var(--primary-color)' : 'none',
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, color: 'var(--text-color)' }}>
            {selected.label}
          </div>
          <div style={{ 
            fontSize: '0.85rem', 
            color: 'var(--text-color)', 
            opacity: 0.7,
            marginTop: '0.25rem',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {selected.description}
          </div>
        </div>
        <ChevronDown 
          size={20} 
          style={{ 
            color: 'var(--text-color)', 
            opacity: 0.6,
            transition: 'transform 0.2s',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            flexShrink: 0,
          }} 
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 4px)',
          left: 0,
          right: 0,
          backgroundColor: 'var(--dropdown-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
          zIndex: 100,
          maxHeight: '320px',
          overflowY: 'auto',
        }}>
          {datasets.map((ds, idx) => (
            <button
              key={ds.name}
              onClick={() => {
                onSelect(ds);
                setIsOpen(false);
              }}
              style={{
                display: 'block',
                width: '100%',
                padding: '0.875rem 1rem',
                backgroundColor: ds.name === selected.name ? 'var(--dropdown-item-active)' : 'transparent',
                border: 'none',
                borderBottom: idx < datasets.length - 1 ? '1px solid var(--border-color)' : 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'background-color 0.15s',
              }}
              onMouseEnter={(e) => {
                if (ds.name !== selected.name) {
                  e.currentTarget.style.backgroundColor = 'var(--dropdown-item-hover)';
                }
              }}
              onMouseLeave={(e) => {
                if (ds.name !== selected.name) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <div style={{ 
                fontWeight: ds.name === selected.name ? 600 : 500, 
                color: ds.name === selected.name ? 'var(--primary-color)' : 'var(--text-color)',
                marginBottom: '0.25rem',
              }}>
                {ds.label}
              </div>
              <div style={{ 
                fontSize: '0.85rem', 
                color: 'var(--text-color)', 
                opacity: 0.65,
                lineHeight: 1.4,
              }}>
                {ds.description}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Source info display below dropdown
export const DatasetSourceInfo: React.FC<{ dataset: Dataset }> = ({ dataset }) => {
  if (!dataset.source && !dataset.dateRetrieved) return null;

  // Extract URL from source string if present
  const urlMatch = dataset.source?.match(/https?:\/\/[^\s)]+/);
  const sourceUrl = urlMatch ? urlMatch[0] : null;
  const sourceText = dataset.source?.replace(/https?:\/\/[^\s)]+/g, '').replace(/\(|\)/g, '').trim();

  return (
    <div style={{
      marginTop: '0.75rem',
      padding: '0.75rem 1rem',
      backgroundColor: 'var(--code-bg)',
      borderRadius: '6px',
      fontSize: '0.85rem',
      color: 'var(--text-color)',
      opacity: 0.85,
    }}>
      {dataset.source && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-start', 
          gap: '0.5rem',
          marginBottom: dataset.dateRetrieved ? '0.5rem' : 0,
        }}>
          <ExternalLink size={14} style={{ marginTop: '2px', flexShrink: 0, opacity: 0.7 }} />
          <div>
            <span style={{ fontWeight: 500 }}>Source: </span>
            {sourceText && <span>{sourceText} </span>}
            {sourceUrl && (
              <a 
                href={sourceUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  color: 'var(--primary-color)', 
                  textDecoration: 'none',
                  wordBreak: 'break-all',
                }}
                onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
              >
                {sourceUrl}
              </a>
            )}
          </div>
        </div>
      )}
      {dataset.dateRetrieved && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Calendar size={14} style={{ opacity: 0.7 }} />
          <span>
            <span style={{ fontWeight: 500 }}>Retrieved: </span>
            {new Date(dataset.dateRetrieved).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
      )}
    </div>
  );
};
