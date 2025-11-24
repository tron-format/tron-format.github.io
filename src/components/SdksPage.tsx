import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import bash from 'highlight.js/lib/languages/bash';
import '../highlight.css';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('bash', bash);

export const SdksPage: React.FC = () => {
  const codeRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    codeRefs.current.forEach((el) => {
      if (el && !el.dataset.highlighted) {
        hljs.highlightElement(el);
      }
    });
  }, []);

  return (
    <div className="markdown-body">
      <h1>SDKs</h1>
      <p>Official TRON SDKs for working with the Token Reduced Object Notation format.</p>
      
      <div className="toc">
        <h4>Contents</h4>
        <ul>
          <li><a href="#available-sdks">Available SDKs</a>
            <ul>
              <li><a href="#javascript-typescript">JavaScript / TypeScript</a></li>
            </ul>
          </li>
          <li><a href="#upcoming-support">Upcoming Support</a></li>
        </ul>
      </div>
      
      <h2 id="available-sdks">Available SDKs</h2>
      
      <h3 id="javascript-typescript">JavaScript / TypeScript</h3>
      <p>
        The official JavaScript library for converting data to and from the TRON format.
      </p>
      <p className="sdk-links">
        <a href="https://github.com/tron-format/tron-javascript" target="_blank" rel="noopener noreferrer">
          GitHub Repository
        </a>
        <span className="link-separator">·</span>
        <a href="https://www.npmjs.com/package/@tron-format/tron" target="_blank" rel="noopener noreferrer">
          npm Package
        </a>
      </p>
      
      <h4>Installation</h4>
      <pre><code 
        ref={(el) => { codeRefs.current[0] = el; }} 
        className="language-bash"
      >npm i @tron-format/tron</code></pre>
      
      <h4>Usage</h4>
      <pre><code 
        ref={(el) => { codeRefs.current[1] = el; }} 
        className="language-javascript"
      >{`import { TRON } from '@tron-format/tron';

const value = { a: 1, b: 2 };
const tron = TRON.stringify(value);
console.log(tron);
// Output: 
// class Object1: a,b
// 
// Object1(1,2)

const parsed = TRON.parse(tron);
console.log(parsed);
// Output:
// { a: 1, b: 2 }`}</code></pre>

      <h2 id="upcoming-support">Upcoming Support</h2>
      <ul>
        <li><strong>Python</strong>: Coming soon</li>
      </ul>
    </div>
  );
};

