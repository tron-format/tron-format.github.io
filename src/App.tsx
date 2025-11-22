import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Suspense, lazy } from 'react';
import './App.css';

const SpecPage = lazy(() => import('./components/SpecPage').then(module => ({ default: module.SpecPage })));
const PlaygroundPage = lazy(() => import('./components/PlaygroundPage').then(module => ({ default: module.PlaygroundPage })));
const SdksPage = lazy(() => import('./components/SdksPage').then(module => ({ default: module.SdksPage })));
const BlogsPage = lazy(() => import('./components/BlogsPage').then(module => ({ default: module.BlogsPage })));

function App() {
  return (
    <ThemeProvider>
      <div className="app-container">
        <Navbar />
        <main>
          <Suspense fallback={<div className="loading">Loading...</div>}>
            <Routes>
              <Route path="/" element={<SpecPage />} />
              <Route path="/playground" element={<PlaygroundPage />} />
              <Route path="/sdks" element={<SdksPage />} />
              <Route path="/blog" element={<BlogsPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
