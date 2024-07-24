import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import 'dotenv/config'

export default defineConfig({
  server: {
    port: Number(`${process.env.FRONTEND_PORT}`)
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },

  },
})
