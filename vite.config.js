import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost", // bind explicitly to localhost
    port: 5173,
    strictPort: true,
    hmr: {
      protocol: "ws",
      host: "localhost", // ensures WebSocket connects to localhost
      port: 5173,
      clientPort: 5173, // sometimes needed on Windows
    },
  },
});
