import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// التكوين الرسمي والمضمون لـ Tailwind v4 مع Vite
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})