import { useState } from "react"
import { getPageQueryString, setPageQueryString } from "./queryStrings";
import AnnotatorGallery from "./AnnotatorGallery";
import { Button, Group, TextInput, Title } from "@mantine/core";

interface AnnotatorProps {
    site: Site,
}

function Annotator({site}: AnnotatorProps) {

    const [ queryString, setQueryString ] = useState(getPageQueryString());
    const [ submitedQueryString, setSubmitedQueryString ] = useState(queryString);
    
    const runQuery = () => {
        setPageQueryString(queryString);
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
            <AnnotatorGallery submitedQueryString={submitedQueryString} site={site} />
        </main>
    );
}

export default Annotator;