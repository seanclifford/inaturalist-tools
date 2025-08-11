/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_INATURALIST_API_URL: string;
	readonly VITE_BASE_PATH: string;
	readonly VITE_AUTH_TOKEN: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
