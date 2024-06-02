import { Link } from "wouter";
import SiteHeader from "./SiteHeader";

function Header(props: {site: Site}) {
    return (
        <header>
            HEADER
            <Link href="/">Home</Link>
            <Link href="/test">Test</Link>
            <SiteHeader site={props.site}/>
        </header>
    );
}

export default Header;