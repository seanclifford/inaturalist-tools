import Home from "./pages/home";
import SiteSelectionPage from "./pages/site-selection";
import Header from "./components/header";
import { Route, Router } from "wouter";
import useSite from "./hooks/useSite";
import useAuthentication from "./hooks/useAuthentication";
import Annotator from "./pages/annotator";
import { AuthContext, CurrentUserContext, SiteContext } from "./Contexts";
import OauthRedirect from "./pages/oauth-redirect";
import { useCurrentUser } from "./hooks/useCurrentUser";

function AppContent() {
	const [site, setSite] = useSite();
	const [authentication] = useAuthentication(site);
	const currentUser = useCurrentUser(authentication);
	return (
		<SiteContext value={[site, setSite]}>
			<AuthContext value={authentication}>
				<CurrentUserContext value={currentUser}>
					<Router base={import.meta.env.VITE_BASE_PATH}>
						<Route path="/">
							<Home />
						</Route>
						<Route path="/site-selection">
							<Header />
							<SiteSelectionPage />
						</Route>
						<Route path="/annotator">
							<Annotator />
						</Route>
						<Route path="/oauth-redirect">
							<OauthRedirect />
						</Route>
					</Router>
				</CurrentUserContext>
			</AuthContext>
		</SiteContext>
	);
}

export default AppContent;
