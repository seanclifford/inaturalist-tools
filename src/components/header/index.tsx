import { Link } from "wouter";
import "./index.css"
import INatSite from "../inat-site";

interface HeaderProps {
    site: Site
}

function Header({site}: HeaderProps) {
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