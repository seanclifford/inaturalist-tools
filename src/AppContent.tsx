import Home from "./pages/home";
import SiteSelectionPage from "./pages/site-selection";
import Header from "./components/header";
import { Route } from "wouter";
import useSite from "./hooks/useSite";
import useAuthentication from "./hooks/useAuthentication";
import Annotator from "./pages/annotator";
import { AuthContext } from "./Contexts";

function AppContent() {
	const [site, setSite] = useSite();
	const [authentication] = useAuthentication(site);
	return (
		<AuthContext value={authentication}>
			<Route path="/">
				<Header site={site} />
				<Home />
			</Route>
			<Route path="/site-selection">
				<Header site={site} />
				<SiteSelectionPage site={site} setSite={setSite} />
			</Route>
			<Route path="/annotator">
				<Annotator site={site} authentication={authentication} />
			</Route>
			<Route path="/oauth-redirect">
			</Route>
		</AuthContext>
	);
}

export default AppContent;
