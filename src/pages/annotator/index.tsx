import { useQuery } from "@tanstack/react-query";
import { getObservation } from "../../inaturalist/api";
import {} from "react"
import ObservationHero from "../../components/observation-hero/ObservationHero";
import { AnnotationSelector } from "../../components/annotation-selector/AnnotationSelector";

function runQuery() {
    //const  { isPending, isError, isFetched, data: observations, error } = useQuery({queryKey: ["sites"], queryFn: getObservations});
    
    return "";
}


function Annotator() {

    const { isPending, isError, data: observation, error } = useQuery({queryKey: ["observation"], queryFn: () => getObservation(260215007)});

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
                <input type="text" id="query" name="query" size={100}/>
                <button type="button" id="queryButton" name="queryButton" onClick={runQuery}>Run Query</button>
            </div>
            TODO
            <ul>
                <li>Enter filter query string to start with (no ui yet to select all filters)</li>
                <li>Select &quot;without annotation&quot; fields - ensure resulting query string includes this</li>
                <li>Load the first x obs and display them in small row based? UI</li>
                <li>allow select annotation - requires AUTH</li>
            </ul>
            <ObservationHero observation={observation} />
            {observation ? <AnnotationSelector observation={observation} /> : null}
        </main>
    );
}

export default Annotator;