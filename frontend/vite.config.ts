import solid from "solid-start/vite";
import vercel from "solid-start-vercel";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [solid()],
	server: {
		host: "127.0.0.1",
		port: 3000
	}
});
