import React from 'react';

interface SDK {
  name: string;
  github: string;
  package: {
    name: string;
    url: string;
  };
}

interface LanguageSDKs {
  language: string;
  id: string;
  sdks: SDK[];
}

const sdksByLanguage: LanguageSDKs[] = [
  {
    language: 'JavaScript / TypeScript',
    id: 'javascript-typescript',
    sdks: [
      {
        name: '@tron-format/tron',
        github: 'https://github.com/tron-format/tron-javascript',
        package: {
          name: 'npm',
          url: 'https://www.npmjs.com/package/@tron-format/tron',
        },
      },
    ],
  },
];

const upcomingLanguages = ["Python", "Rust"];

export const SdksPage: React.FC = () => {
  return (
    <div className="markdown-body">
      <h1>SDKs</h1>
      <p>SDKs for working with the TRON (Token Reduced Object Notation) format.</p>
      <p>
        Have you built an SDK for TRON? Whether it's for a new language or an already supported language, we'd love to feature it here! 
        <br />
        <a href="https://github.com/tron-format/tron-format.github.io/issues/new" target="_blank" rel="noopener noreferrer">
          Create an issue
        </a> on our GitHub repository with details about your SDK and we'll add it to this page.
      </p>
      
      <h2 id="available-sdks">Available SDKs</h2>
      
      {sdksByLanguage.map((lang) => (
        <div key={lang.id}>
          <strong id={lang.id}>{lang.language}</strong>
          <ul>
            {lang.sdks.map((sdk) => (
              <li key={sdk.name}>
                <strong>{sdk.name}</strong>{': '}
                <a href={sdk.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                {' · '}
                <a href={sdk.package.url} target="_blank" rel="noopener noreferrer">{sdk.package.name}</a>
                <span> (used by the Playground on this website)</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <h2 id="upcoming-support">Upcoming Support</h2>
        {upcomingLanguages.map((lang) => (
          <p key={lang}><strong>{lang}</strong>: Coming soon</p>
        ))}
    </div>
  );
};
