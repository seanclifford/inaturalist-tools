import { useQuery } from "@tanstack/react-query";
import { sitesQueryOptions } from "../../inaturalist/queryOptions";

function SitesList(props : {sites : Site[]|undefined, currentSite: Site, setCurrentSite: React.Dispatch<React.SetStateAction<number>>})
{
    const listItems = props.sites?.map(site => 
        <li 
            key={site.id}
            style={site.id === props.currentSite.id ? {fontWeight:"bold"} : undefined}
            onClick={() => props.setCurrentSite(site.id)}
            >
            {site.name}
        </li>);
    return (<ul>{listItems}</ul>);
}

function TestPage(props: {site: Site, setSite: React.Dispatch<React.SetStateAction<number>>}) {
    const  { isPending, isError, isFetched, data: sites, error } = useQuery(sitesQueryOptions());

    return (
        <main>
            <h1>Test Page</h1>
            {isPending? "Loading...": null}
            {isError? "ERROR:" + error : null }
            {isFetched && sites ? <SitesList sites={sites} currentSite={props.site} setCurrentSite={props.setSite}></SitesList> : null}
        </main>
    );
}

export default TestPage;