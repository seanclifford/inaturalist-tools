import { useQuery } from "@tanstack/react-query";
import { sitesQueryOptions } from "../../inaturalist/queryOptions";
import SitesList from "./SiteList";

interface SiteSelectionPageProps {
    site: Site, 
    setSite: React.Dispatch<React.SetStateAction<Site>>
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