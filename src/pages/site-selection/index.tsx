import { useQuery } from "@tanstack/react-query";
import SitesList from "./SiteList";
import { getSites } from "../../inaturalist/api";

interface SiteSelectionPageProps {
    site: Site, 
    setSite: React.Dispatch<React.SetStateAction<Site>>
}

const oneDay = 24*60*60*1000;

function SiteSelectionPage({site, setSite}: SiteSelectionPageProps) {
    const  { isPending, isError, isFetched, data: sites, error } = useQuery({queryKey: ["sites"], queryFn: getSites, staleTime: oneDay});

    return (
        <main>
            <h1>Select a site</h1>
            {isPending? "Loading...": null}
            {isError? `ERROR: ${error.name} ${error.message}` : null }
            {isFetched && sites ? <SitesList sites={sites} currentSite={site} setCurrentSite={setSite}/> : null}
        </main>
    );
}

export default SiteSelectionPage;