import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

const isProduction = process.env.NODE_ENV === "  production"
const basePath = isProduction ? "/react-videoplayer/" : "./";
export default defineConfig({
  base: basePath,
  plugins: [react()],
})
