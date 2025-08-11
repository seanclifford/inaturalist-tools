import { Link } from "wouter";
import "./index.css";
import INatSite from "../inat-site";
import { useContext } from "react";
import { SiteContext } from "../../Contexts";

function Header() {
	const [site] = useContext(SiteContext);
	return (
		<header>
			<nav className="links">
				<Link href="/">Home</Link>
				<Link href="/annotator">Annotator</Link>
			</nav>
			<Link href="/site-selection">
				<INatSite site={site} isShort />
			</Link>
		</header>
	);
}

export default Header;
