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

    let customAnnotationFunctions = annotationFunctions;
    if (annotationFunctions)
    {
        const {saveAnnotation, deleteAnnotation} = annotationFunctions;

        const smartSaveAnnotation = async (params : SaveAnnotationParams) => {
            const existingAnnotation = yourAnnotations.find(a => a.controlled_attribute_id === controlledTerm.id && a.controlled_value_id !== params.controlledValueId);
            
            if (existingAnnotation){
                console.log(`Deleting existing annotation ${existingAnnotation.uuid}`)
                await deleteAnnotation({observationId: observation.id, annotationId: existingAnnotation.uuid});
            }
            else {
                console.log('No existing annotation found to delete')
            }
            return await saveAnnotation(params);
        };

        customAnnotationFunctions = {saveAnnotation:smartSaveAnnotation, deleteAnnotation};
    }

    
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
                        annotationFunctions={customAnnotationFunctions}
                        key={controlledTermValue.id} />
                );
            })}
            </Group>
        </Chip.Group>);
}