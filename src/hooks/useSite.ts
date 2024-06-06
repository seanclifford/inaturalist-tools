import { useEffect, useState } from "react";

function useSite() : [Site, React.Dispatch<React.SetStateAction<Site>>] {
    const [site, saveSite] = useState(loadSiteFromStore());

    useEffect(() => { saveSiteToStore(site) }, [site]);

    return [site, saveSite];
}

function loadSiteFromStore(): Site {
    const localStorageSiteJson = localStorage.getItem("current-site");
    
    return localStorageSiteJson ? JSON.parse(localStorageSiteJson) as Site : defaultSite();
}

function saveSiteToStore(site: Site)
{
    localStorage.setItem("current-site", JSON.stringify(site));
}

function defaultSite() : Site {
    return {
        id: 1,
        name: "iNaturalist",
        site_name_short: "iNat",
        url: "https://www.inaturalist.org",
        icon_url: "https://static.inaturalist.org/sites/1-logo_square.png",
    };
}

export default useSite;