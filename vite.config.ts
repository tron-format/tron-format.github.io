import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-markdown': ['react-markdown', 'remark-gfm'],
          'vendor-rehype': ['rehype-highlight', 'rehype-raw'],
          'vendor-tiktoken': ['js-tiktoken'],
        },
      },
    },
  },
})
