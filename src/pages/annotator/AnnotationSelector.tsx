import { Chip, Group, Stack, Title } from "@mantine/core";
import { useObservationControlledTerms } from "./useObservationControlledTerms";

interface AnnotationSelectorProps {
    observation: Observation
}

export function AnnotationSelector(props: AnnotationSelectorProps ) {
    const { status, error, data: observationControlledTerms } = useObservationControlledTerms(props.observation);
    if (status === "pending") {
        return(<div>Loading...</div>);
    }
    if (status === "error") {
        return(<div>Error: {error?.name ?? "unknown"} {error?.message}</div>);
    }

    const observationSelectedAnnotationIds = props.observation.annotations.map(annotation => annotation.controlled_value_id);

    return(<Stack gap="md">
        {observationControlledTerms.map(controlledTerm => {
            return(
                <Stack gap="xs" key={controlledTerm.id}>
                    <Title size="md">{controlledTerm.label}</Title>
                    <Chip.Group multiple={controlledTerm.multivalued}>
                        <Group gap="xs">
                        {controlledTerm.values.map(controlledTermValue => {
                            return(
                                <Chip 
                                    key={controlledTermValue.id}
                                    value={controlledTermValue.id} 
                                    checked={observationSelectedAnnotationIds.some(id => id === controlledTermValue.id)}>
                                    {controlledTermValue.label}
                                </Chip>
                            );
                        })}
                        </Group>
                    </Chip.Group>
                </Stack>
            );
        })}
    </Stack>);
}