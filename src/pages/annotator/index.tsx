import { useEffect, useState } from "react"
import AnnotatorGallery from "./AnnotatorGallery";
import { useAnnotatorObservations } from "./useAnnotatorObservations";
import { usePageQueryString } from "../../hooks/usePageQueryString";
import { useDisclosure } from "@mantine/hooks";
import { SettingsIcon } from "lucide-react";
import ObservationFilter from "../../components/observation-filter/ObservationFilter";

interface AnnotatorProps {
    site: Site
    currentUser?: User
}

function Annotator({site, currentUser}: AnnotatorProps) {

    const [ pageQueryString, setPageQueryString ] = usePageQueryString();
    const [ submitedQueryString, setSubmitedQueryString ] = useState(pageQueryString);
    const [settingsOpened, {open: openSettings, close: closeSettings}] = useDisclosure(false);
    const {annotatorObservations, status, error, annotationFunctions} = useAnnotatorObservations(submitedQueryString, site, currentUser);
    const runQuery = (queryString: string) => {
        setPageQueryString(queryString);
        closeSettings();
    };
    useEffect(() => setSubmitedQueryString(pageQueryString), [pageQueryString]);
   
    return (
        <main>
            <ObservationFilter opened={settingsOpened} close={closeSettings} pageQueryString={pageQueryString} runQuery={runQuery} />
            <SettingsIcon onClick={openSettings}/>
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