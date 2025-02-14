import { Chip, Group, Stack, Title } from "@mantine/core";

interface AnnotationSelectorProps {
    observation: Observation
    observationControlledTerms: ControlledTerm[]
}

export function AnnotationSelector(props: AnnotationSelectorProps ) {

    const observationSelectedAnnotationIds = props.observation.annotations.map(annotation => annotation.controlled_value_id);

    return(<Stack gap="md">
        {props.observationControlledTerms.map(controlledTerm => {
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