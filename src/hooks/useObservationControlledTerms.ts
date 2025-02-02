import { useControlledTerms } from "./useControlledTerms"

interface ObservationControlledTerms {
    data: ControlledTerm[],
    status: "success" | "error" | "pending",
    error: Error | null
}

export function useObservationControlledTerms(observation: Observation) : ObservationControlledTerms {
    const observationControlledTerms : ControlledTerm[] = [];

    const { status, error, data: controlledTerms } = useControlledTerms();
    if (status !== "success") {
        return { status, error, data: observationControlledTerms };
    }

    for (const controlledTerm of controlledTerms) {
        if (!controlledTermAppliesToObservation(observation, controlledTerm))
            continue;
        const controlledTermValues : ControlledTermValue[] = []
        for(const controlledTermValue of controlledTerm.values) {
            if (controlledTermAppliesToObservation(observation, controlledTermValue))
                controlledTermValues.push(controlledTermValue);
        }
        observationControlledTerms.push({...controlledTerm, values: controlledTermValues});
    }

    return { status: "success", error, data: observationControlledTerms };
}

function controlledTermAppliesToObservation(observation: Observation, controlledTerm: ControlledTermBase) {
    const included = !controlledTerm.taxon_ids || controlledTerm.taxon_ids.some(x => observation.taxon.ancestor_ids.includes(x));
    if (!included) {
        return false;
    }
    const excepted = controlledTerm.excepted_taxon_ids?.some(x => observation.taxon.ancestor_ids.includes(x));
    return !excepted;
}