import { useState } from "react"
import { getPageQueryString, setPageQueryString } from "./queryStrings";
import AnnotatorGallery from "./AnnotatorGallery";

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
            <b>Annotator</b>
            <div>
                <label htmlFor="query">Observation query options:</label>
                <input type="text" id="query" name="query" size={100} value={queryString} onChange={e => setQueryString(e.target.value)}/>
                <button type="button" id="queryButton" name="queryButton" onClick={runQuery}>Run Query</button>
            </div>
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