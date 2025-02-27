import { Chip, Group, Stack, Title } from "@mantine/core";
import UserAccount from "../../components/user-account/UserAccount";

interface AnnotationSelectorProps {
    observation: Observation
    observationControlledTerms: ControlledTerm[]
    currentUser?: User
}

export function AnnotationSelector({observation, observationControlledTerms, currentUser}: AnnotationSelectorProps ) {
    return(<Stack gap="md">
        {observationControlledTerms.map(controlledTerm => {
            const annotations = observation.annotations.filter(a => a.controlled_attribute_id === controlledTerm.id);
            const othersAnnotations = annotations.filter(a => a.user_id !== currentUser?.id);
            const yourAnnotations = annotations.filter(a => a.user_id === currentUser?.id);
            return(
                <Stack gap="xs" key={controlledTerm.id}>
                    <Title size="md">{controlledTerm.label}</Title>
                    <Group gap="xs">
                    {othersAnnotations.map(annotation => 
                        <Group gap="xs">
                            <Chip checked={true} variant="light">{controlledTerm.values.find(t => t.id == annotation.controlled_value_id)?.label}</Chip>
                            <UserAccount size="sm" user={annotation.user} />
                        </Group>
                    )}
                    {othersAnnotations.length == 0 || (controlledTerm.multivalued && controlledTerm.values.length > othersAnnotations.length) ? 
                        <Chip.Group multiple={controlledTerm.multivalued}>
                            <Group gap="xs">
                            {controlledTerm.values.filter(x => othersAnnotations.every(y => y.controlled_value_id != x.id)).map(controlledTermValue => {
                                return(
                                    <Chip 
                                        key={controlledTermValue.id}
                                        value={controlledTermValue.id} 
                                        checked={yourAnnotations.some(annotation => annotation?.controlled_value_id === controlledTermValue.id)}>
                                        {controlledTermValue.label}
                                    </Chip>
                                );
                            })}
                            </Group>
                        </Chip.Group>
                    : null}
                    </Group>
                </Stack>
            );
        })}
    </Stack>);
}