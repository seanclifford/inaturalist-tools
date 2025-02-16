import { Avatar, Chip, Group, Stack, Title } from "@mantine/core";

interface AnnotationSelectorProps {
    observation: Observation
    observationControlledTerms: ControlledTerm[]
    currentUser?: User
}

export function AnnotationSelector({observation, observationControlledTerms, currentUser}: AnnotationSelectorProps ) {
    return(<Stack gap="md">
        {observationControlledTerms.map(controlledTerm => {
            const annotation = observation.annotations.find(a => a.controlled_attribute_id === controlledTerm.id);
            return(
                <Stack gap="xs" key={controlledTerm.id}>
                    <Title size="md">{controlledTerm.label}</Title>
                    {annotation && annotation.user_id !== currentUser?.id ?
                        <Group gap="xs">
                            <Chip checked={true} variant="light">{controlledTerm.values.find(t => t.id == annotation.controlled_value_id)?.label}</Chip>
                            <Avatar size="sm" src={annotation.user?.icon} radius="xl" />
                        </Group>
                    : 
                        <Chip.Group multiple={controlledTerm.multivalued}>
                            <Group gap="xs">
                            {controlledTerm.values.map(controlledTermValue => {
                                return(
                                    <Chip 
                                        key={controlledTermValue.id}
                                        value={controlledTermValue.id} 
                                        checked={annotation?.controlled_value_id === controlledTermValue.id}>
                                        {controlledTermValue.label}
                                    </Chip>
                                );
                            })}
                            </Group>
                        </Chip.Group>
                    }
                </Stack>
            );
        })}
    </Stack>);
}