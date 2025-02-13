import { useQuery } from "@tanstack/react-query"
import { getObservations } from "../../inaturalist/api";
import { useObservationControlledTerms } from "./useObservationControlledTerms"

interface AnnotatorObservation {
    observation?: Observation
    controlledTerms?: ObservationControlledTerms
    status: "success" | "error" | "pending"
    error?: Error | null
}

export function useAnnotatorObservations(submitedQueryString: string) : AnnotatorObservation[] {
    
    const generateQueryString = (query: string) : URLSearchParams =>{
        const searchParams = new URLSearchParams(query);
        return searchParams;
    };

    const { isPending, isError, data: observations, error } = useQuery({queryKey: ["observations", submitedQueryString], queryFn: () => getObservations(generateQueryString(submitedQueryString))});

    if (isPending)
        return [{status:"pending"}];
    if (isError)
        return [{status:"error", error}]

    return observations.map(obs => { return {observation:obs, controlledTerms: useObservationControlledTerms(obs), status: "success" }});
}