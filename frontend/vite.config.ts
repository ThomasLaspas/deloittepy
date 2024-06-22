import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.API_URL": JSON.stringify(
        env.API_URL
      ),
      
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
}});

