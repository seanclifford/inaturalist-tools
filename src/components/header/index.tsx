import { Link } from "wouter";

function Header() {
    return (
        <header>
            HEADER
            <Link href="/">Home</Link>
            <Link href="/test">Test</Link>
        </header>
    );
}

export default Header;