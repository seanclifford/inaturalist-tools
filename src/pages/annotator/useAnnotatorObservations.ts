import { useQuery } from "@tanstack/react-query"
import { getObservations } from "../../inaturalist/api";
import { useControlledTerms } from "../../hooks/useControlledTerms";

interface AnnotatorObservationResult {
    annotatorObservations?: AnnotatorObservation[]
    status: "sucess" | "error" | "pending"
    error?: Error
}

export function useAnnotatorObservations(submitedQueryString: string) : AnnotatorObservationResult {
    
    const generateQueryString = (query: string) : URLSearchParams =>{
        const searchParams = new URLSearchParams(query);
        return searchParams;
    };

    const { status: observationStatus, data: observations, error: observationError } = useQuery({queryKey: ["observations", submitedQueryString], queryFn: () => getObservations(generateQueryString(submitedQueryString))});
    const { status: controlledTermStatus, error:controlledTermsError, data: controlledTerms } = useControlledTerms();

    if (observationStatus === "pending" || controlledTermStatus === "pending")
        return {status:"pending"};
    if (observationStatus === "error")
        return {status:"error", error:observationError}
    if (controlledTermStatus === "error")
        return {status:"error", error:controlledTermsError}

    const annotatorObservations = observations
        .map(observation => { return {observation:observation, controlledTerms: getTaxonControlledTerms(observation.taxon, controlledTerms), status: "success" } as AnnotatorObservation})
        .filter(annotatorObservation => annotatorObservation.controlledTerms.length > 0);
    
    return {annotatorObservations, status:"sucess"};
}

function getTaxonControlledTerms(taxon: Taxon, controlledTerms: ControlledTerm[]) : ControlledTerm[] {
    const taxonControlledTerms : ControlledTerm[] = [];
    if (!taxon)
        return taxonControlledTerms;

    for (const controlledTerm of controlledTerms) {
        if (!controlledTermAppliesToTaxon(taxon, controlledTerm))
            continue;
        const controlledTermValues : ControlledTermValue[] = []
        for(const controlledTermValue of controlledTerm.values) {
            if (controlledTermAppliesToTaxon(taxon, controlledTermValue))
                controlledTermValues.push(controlledTermValue);
        }
        if (controlledTermValues.length > 0)
            taxonControlledTerms.push({...controlledTerm, values: controlledTermValues});
    }

    return taxonControlledTerms;
}

function controlledTermAppliesToTaxon(taxon: Taxon, controlledTerm: ControlledTermBase) {
    const included = !controlledTerm.taxon_ids || controlledTerm.taxon_ids.some(x => taxon?.ancestor_ids?.includes(x));
    if (!included) {
        return false;
    }
    const excepted = controlledTerm.excepted_taxon_ids?.some(x => taxon?.ancestor_ids?.includes(x));
    return !excepted;
}