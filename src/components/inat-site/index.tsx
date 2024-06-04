import "./index.css"

interface INatSiteProps {
    site: Site,
    isShort?: boolean
}

function INatSite({site, isShort = false}: INatSiteProps) {
    return (
        <div className="inat_site">
            <img className="site_img" src={site.icon_url}></img>
            <span className="site_title">
                <div>{isShort && site.site_name_short ? site.site_name_short : site.name}</div>
                <div className="site_url">{site.url}</div>
            </span>
        </div>
    );
}

export default INatSite;