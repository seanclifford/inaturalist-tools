import { Link } from "wouter";
import "./index.css"
import SiteHeader from "./SiteHeader";

function Header(props: {site: Site}) {
    return (
        <header>
            <nav className="links">
                <Link href="/">Home</Link>
                <Link href="/test">Test</Link>
            </nav>
            <SiteHeader site={props.site}/>
        </header>
    );
}

export default Header;