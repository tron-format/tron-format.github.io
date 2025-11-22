import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import specContent from '../../SPEC.md?raw';
import '../highlight.css'; // Import custom highlight.js theme with variables

export const SpecPage: React.FC = () => {
  return (
    <div className="markdown-body">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
      >
        {specContent}
      </ReactMarkdown>
    </div>
  );
};
