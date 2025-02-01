import { useObservationControlledTerms } from "../../hooks/useObservationControlledTerms";

type AnnotationSelectorProps = {
    observation: Observation
}

export function AnnotationSelector(props: AnnotationSelectorProps) {
    const { status, error, data: observationControlledTerms } = useObservationControlledTerms(props.observation);
    if (status === "pending") {
        return(<div>Loading...</div>);
    }
    if (status === "error") {
        return(<div>Error: {error?.name ?? "unknown"} {error?.message}</div>);
    }

    return(<>
        {observationControlledTerms.map(controlledTerm => {
            return(<div key={controlledTerm.id}>
                <h2>{controlledTerm.label}</h2>
                <ul>
                    {controlledTerm.values.map(controlledTermValue => {
                        return(<li key={controlledTermValue.id}>
                            <label htmlFor={controlledTermValue.label}>{controlledTermValue.label}</label>
                            <input type="checkbox" id={controlledTermValue.label} name={controlledTermValue.label} />
                        </li>);
                    })}
                </ul>
            </div>);
        })}
    </>);
}