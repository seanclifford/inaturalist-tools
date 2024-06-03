import { Link } from "wouter";
import "./index.css"
import SiteHeader from "./SiteHeader";

interface HeaderProps {
    site: Site
}

function Header({site}: HeaderProps) {
    return (
        <header>
            <nav className="links">
                <Link href="/">Home</Link>
            </nav>
            <SiteHeader site={site}/>
        </header>
    );
}

export default Header;