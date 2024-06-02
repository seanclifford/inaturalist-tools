import { Link } from "wouter";
import SiteHeader from "./SiteHeader";

function Header() {
    return (
        <header>
            HEADER
            <Link href="/">Home</Link>
            <Link href="/test">Test</Link>
            <SiteHeader/>
        </header>
    );
}

export default Header;