import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // More specific proxy path to avoid conflicts
      '/api/finicity': {
        target: 'https://api.finicity.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/finicity/, ''),
      },
    },
    historyApiFallback: true,
  },
});