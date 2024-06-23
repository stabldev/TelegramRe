import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  server: {
    preset: "vercel"
  },
  vite({ router }) {
    if (router === "client") {
      return {
        server: {
          hmr: {
            port: 4000
          }
        }
      };
    }
    return {};
  }
});
