import { createContext } from "react";
import { unauthenticated } from "./hooks/useAuthentication";
import { defaultSite } from "./hooks/useSite";

export const AuthContext = createContext<Authentication>(unauthenticated());
export const SiteContext = createContext<
	[Site, React.Dispatch<React.SetStateAction<Site>>]
>([defaultSite(), () => {}]);
export const CurrentUserContext = createContext<User | null>(null);
