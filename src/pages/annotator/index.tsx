import { useQuery } from "@tanstack/react-query";
import { getObservations } from "../../inaturalist/api";
import { useState } from "react"
import ObservationHero from "../../components/observation-hero/ObservationHero";
import { AnnotationSelector } from "../../components/annotation-selector/AnnotationSelector";

interface AnnotatorProps {
    site: Site,
}

function generateQueryString(query: string) : URLSearchParams {
    const searchParams = new URLSearchParams(query);
    return searchParams;
}

function Annotator(props: AnnotatorProps) {

    const [ queryString, setQueryString ] = useState("");
    const [ submitedQueryString, setSubmitedQueryString ] = useState("");
    const { isPending, isError, data: observations, error } = useQuery({queryKey: ["observations", submitedQueryString], queryFn: () => getObservations(generateQueryString(submitedQueryString))});

    const runQuery = () => setSubmitedQueryString(queryString);

    if (isPending) {
        return (<div>Loading...</div>);
    }
    if (isError) {
        return (<div>Error: {error?.name ?? "unknown"} {error?.message}</div>);
    }

    return (
        <main>
            <h1>Annotator</h1>
            <div>
                <label htmlFor="query">Observation query options:</label>
                <input type="text" id="query" name="query" size={100} value={queryString} onChange={e => setQueryString(e.target.value)}/>
                <button type="button" id="queryButton" name="queryButton" onClick={runQuery}>Run Query</button>
            </div>
            TODO
            <ul>
                <li>Select &quot;without annotation&quot; fields - ensure resulting query string includes this</li>
                <li>Load the first x obs and display them in small row based? UI</li>
                <li>allow select annotation - requires AUTH</li>
            </ul>
            <div style={{display: "flex", flexWrap: "wrap", flexDirection: "row"}}>
                {observations?.map(observation => 
                <div key={observation.id}>
                    <ObservationHero observation={observation} site={props.site} />
                    {observation ? <AnnotationSelector observation={observation} /> : null}
                </div>
                )}
            </div>
        </main>
    );
}

export default Annotator;