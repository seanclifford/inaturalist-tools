import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());
	return {
		base: env.VITE_BASE_PATH,
		plugins: [react()],
		host: process.env.VITE_SERVER_HOST,
		preview: {
			headers: {
				"content-security-policy":
					"default-src 'self'; style-src-elem 'self' 'unsafe-inline'; connect-src https://api.inaturalist.org; img-src 'self' *.inaturalist.org https://inaturalist-open-data.s3.amazonaws.com",
			},
		},
	};
});
