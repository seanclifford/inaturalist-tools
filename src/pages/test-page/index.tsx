import { useSites } from "../../hooks/useSites";

function SitesList(props : {sites : Site[]|undefined})
{
    const listItems = props.sites?.map(site => <li>{site.name}</li>);
    return (<ul>{listItems}</ul>);
}

function TestPage() {
    const  { isPending, isError, isFetched, data, error } = useSites();

    return (
        <main>
            <h1>Test Page</h1>
            {isPending? "Loading...": null}
            {isError? "ERROR:" + error : null }
            {isFetched ? <SitesList sites={data}></SitesList> : null}
        </main>
    );
}

export default TestPage;