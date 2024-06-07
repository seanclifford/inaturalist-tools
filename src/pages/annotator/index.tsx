function runQuery() {
    
}


function Annotator() {
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
                <li>Select "without annotation" fields - ensure resulting query string includes this</li>
                <li>Load the first x obs and display them in small row based? UI</li>
                <li>allow select annotation - requires AUTH</li>
            </ul>
        </main>
    );
}

export default Annotator;