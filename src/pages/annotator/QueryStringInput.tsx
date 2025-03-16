import { Button, Group, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";

interface QueryStringInputProps {
    pageQueryString: string
    runQuery: (_: string) => void
}

export default function QueryStringInput({pageQueryString, runQuery} : QueryStringInputProps)
{
    const [ queryString, setQueryString ] = useState(pageQueryString);

    useEffect(() =>
    {
        setQueryString(pageQueryString);
    }, [pageQueryString]);

    return (
        <Group>
            <TextInput 
                label='Observation query options' 
                value={queryString} 
                inputSize="100"
                onChange={e => setQueryString(e.currentTarget.value)}/>
            <Button onClick={() => runQuery(queryString)}>Run Query</Button>
        </Group>
    )
}