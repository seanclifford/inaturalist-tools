import { useState } from "react"
import AnnotatorGallery from "./AnnotatorGallery";
import { Button, Group, TextInput, Title } from "@mantine/core";
import { useAnnotatorObservations } from "./useAnnotatorObservations";
import { usePageQueryString } from "../../hooks/usePageQueryString";

interface AnnotatorProps {
    site: Site
    currentUser?: User
}

function Annotator({site, currentUser}: AnnotatorProps) {

    const [ queryString, setQueryString ] = usePageQueryString();
    const [ submitedQueryString, setSubmitedQueryString ] = useState(queryString);
    const {annotatorObservations, status, error} = useAnnotatorObservations(submitedQueryString, site);

    const runQuery = () => {
        setQueryString(queryString);
        setSubmitedQueryString(queryString);
    };
   
    return (
        <main>
            <Title size="sm">Annotator</Title>
            <Group>
                <TextInput 
                    label='Observation query options' 
                    value={queryString} 
                    inputSize="100"
                    onChange={e => setQueryString(e.currentTarget.value)}/>
                <Button onClick={runQuery}>Run Query</Button>
            </Group>
            TODO
            <ul>
                <li>Select &quot;without annotation&quot; fields - ensure resulting query string includes it</li>
                <li>allow select annotation - requires AUTH</li>
            </ul>
            {status === "pending" ? <div key='loading'>Loading...</div> : null}
            {status === "error" ? <div key='loading'>Error: {error?.name ?? "unknown"} {error?.message}</div> : null}
            {status === "sucess" && annotatorObservations ? 
                <AnnotatorGallery 
                    annotatorObservations={annotatorObservations} 
                    site={site}
                    currentUser={currentUser}/> 
                : null }
        </main>
    );
}

export default Annotator;