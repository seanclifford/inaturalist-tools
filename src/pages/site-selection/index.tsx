import { useQuery } from "@tanstack/react-query";
import { sitesQueryOptions } from "../../inaturalist/queryOptions";

interface SiteSelectionPageProps {
    site: Site, 
    setSite: React.Dispatch<React.SetStateAction<Site>>
}

interface SitesListProps {
    sites : Site[]|undefined, 
    currentSite: Site, 
    setCurrentSite: React.Dispatch<React.SetStateAction<Site>>
}

function SitesList({sites, currentSite, setCurrentSite}: SitesListProps)
{
    const listItems = sites?.map(site => 
        <li 
            key={site.id}
            style={site.id === currentSite.id ? {fontWeight:"bold"} : undefined}
            onClick={() => setCurrentSite(site)}
            >
            {site.name}
        </li>);
    return (<ul>{listItems}</ul>);
}

function SiteSelectionPage({site, setSite}: SiteSelectionPageProps) {
    const  { isPending, isError, isFetched, data: sites, error } = useQuery(sitesQueryOptions());

    return (
        <main>
            <h1>Select a site</h1>
            {isPending? "Loading...": null}
            {isError? "ERROR:" + error : null }
            {isFetched && sites ? <SitesList sites={sites} currentSite={site} setCurrentSite={setSite}/> : null}
        </main>
    );
}

export default SiteSelectionPage;