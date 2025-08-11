import { createContext } from "react";
import { defaultSite } from "./hooks/useSite";
import { unauthenticated } from "./hooks/useAuthentication";

export const AuthContext = createContext<Authentication>(unauthenticated());
export const SiteContext = createContext<
	[Site, React.Dispatch<React.SetStateAction<Site>>]
>([defaultSite(), () => {}]);
export const CurrentUserContext = createContext<User | null>(null);
