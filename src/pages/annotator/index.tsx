import { useEffect, useState } from "react"
import AnnotatorGallery from "./AnnotatorGallery";
import { Title } from "@mantine/core";
import { useAnnotatorObservations } from "./useAnnotatorObservations";
import { usePageQueryString } from "../../hooks/usePageQueryString";
import QueryStringInput from "./QueryStringInput";

interface AnnotatorProps {
    site: Site
    currentUser?: User
}

function Annotator({site, currentUser}: AnnotatorProps) {

    const [ pageQueryString, setPageQueryString ] = usePageQueryString();
    const [ submitedQueryString, setSubmitedQueryString ] = useState(pageQueryString);
    const {annotatorObservations, status, error, annotationFunctions} = useAnnotatorObservations(submitedQueryString, site);
    const runQuery = (queryString: string) => {
        setPageQueryString(queryString);
    };
    useEffect(() => setSubmitedQueryString(pageQueryString), [pageQueryString]);
   
    return (
        <main>
            <Title size="sm">Annotator</Title>
            <QueryStringInput pageQueryString={pageQueryString} runQuery={runQuery} />
            {status === "pending" ? <div key='loading'>Loading...</div> : null}
            {status === "error" ? <div key='loading'>Error: {error?.name ?? "unknown"} {error?.message}</div> : null}
            {status === "sucess" && annotatorObservations ? 
                <AnnotatorGallery 
                    annotatorObservations={annotatorObservations}
                    site={site}
                    currentUser={currentUser}
                    annotationFunctions={annotationFunctions}/> 
                : null }
        </main>
    );
}

export default Annotator;