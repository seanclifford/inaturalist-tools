import "./SiteHeader.css"
import { useSite } from "../../hooks/useSites";
import { Link } from "wouter";

function SiteHeader() {
    const  [{ isError, isFetched, data:site, error }, _] = useSite();

    if (isFetched && site) {
        return (
            <span className="affiliation">
                <img className="site_img" src={site.icon_url}></img>
                <span className="site_title">{site.site_name_short}</span>
                (<Link href="/test">change</Link>) 
            </span>
        );
    }
    if (isError)
        return <span className="error">{error.message}</span>
    else
        return <span>Loading...</span>
}

export default SiteHeader;