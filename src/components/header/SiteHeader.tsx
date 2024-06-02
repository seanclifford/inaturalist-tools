import "./SiteHeader.css"
import { Link } from "wouter";

function SiteHeader(props: {site: Site}) {

    if (props.site) {
        return (
            <span className="affiliation">
                <img className="site_img" src={props.site.icon_url}></img>
                <span className="site_title">{props.site.site_name_short}</span>
                (<Link href="/test">change</Link>) 
            </span>
        );
    }
}

export default SiteHeader;