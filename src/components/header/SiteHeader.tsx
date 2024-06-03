import "./SiteHeader.css"
import { Link } from "wouter";

interface SiteHeaderProps {
    site: Site
}

function SiteHeader({site}: SiteHeaderProps) {
    return (
        <Link href="/site-selection">
            <span className="affiliation">
                <img className="site_img" src={site.icon_url}></img>
                <div className="site_title">{site.site_name_short}</div>
            </span>
        </Link>
    );
}

export default SiteHeader;