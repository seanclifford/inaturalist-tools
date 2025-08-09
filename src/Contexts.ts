import { createContext } from "react";

export const AuthContext = createContext<Authentication>({
	isAuthenticated: false,
	login: () => {},
});
export const SiteContext = createContext<Site | null>(null);
