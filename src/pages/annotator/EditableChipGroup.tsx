import { Chip, Group } from "@mantine/core";
import SelectableChip from "./SelectableChip";

interface EditableChipGroupProps {
    observation: Observation
    controlledTerm: ControlledTerm
    yourAnnotations: Annotation[]
    othersAnnotations: Annotation[]
    annotationFunctions?: AnnotationFunctions
}

export function EditableChipGroup({observation, controlledTerm, yourAnnotations, othersAnnotations, annotationFunctions}:EditableChipGroupProps) {
    const yourSelectedIds = yourAnnotations
                                .filter(x => x.controlled_attribute_id === controlledTerm.id)
                                .map(annotation => annotation.controlled_value_id.toString());

    const availableControlledTermValues = controlledTerm.values.filter(x => othersAnnotations.every(y => y.controlled_value_id != x.id));
    
    return (
        <Chip.Group multiple={controlledTerm.multivalued} 
                    value={yourSelectedIds}>
            <Group gap="xs">
            {availableControlledTermValues.map(controlledTermValue => {
                return(
                    <SelectableChip 
                        observation={observation}
                        controlledTerm={controlledTerm}
                        controlledValue={controlledTermValue}
                        yourAnnotations={yourAnnotations} 
                        annotationFunctions={annotationFunctions}
                        key={controlledTermValue.id} />
                );
            })}
            </Group>
        </Chip.Group>);
}