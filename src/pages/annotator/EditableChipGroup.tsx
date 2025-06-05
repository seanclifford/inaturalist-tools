import { Chip, Group } from "@mantine/core";
import SelectableChip from "./SelectableChip";
import { useState } from "react";

interface EditableChipGroupProps {
    observation: Observation
    controlledTerm: ControlledTerm
    yourAnnotations: Annotation[]
    othersAnnotations: Annotation[]
    annotationFunctions?: AnnotationFunctions
}

export function EditableChipGroup({observation, controlledTerm, yourAnnotations, othersAnnotations, annotationFunctions}:EditableChipGroupProps) {
    const [processing, setProcessing] = useState(false);
    
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
            
            setProcessing(true);
            try {
                if (existingAnnotation){
                    console.log(`Deleting existing annotation ${existingAnnotation.uuid}`)
                    await deleteAnnotation({observationId: observation.id, annotationId: existingAnnotation.uuid});
                }
                else {
                    console.log('No existing annotation found to delete')
                }
                const result = await saveAnnotation(params);
                return result;
            }
            finally {
                setProcessing(false);
            }
        };

        const smartDeleteAnnotation = async (params: DeleteAnnotationParams) => {
            setProcessing(true);
            try {
                await deleteAnnotation(params);
            }
            finally {
                setProcessing(false);
            }
        };

        customAnnotationFunctions = {saveAnnotation:smartSaveAnnotation, deleteAnnotation:smartDeleteAnnotation};
    }

    
    return (
        <Chip.Group multiple={controlledTerm.multivalued}
                    value={yourSelectedIds}>
            <Group gap="xs">
            {availableControlledTermValues.map(controlledTermValue => {
                return(
                    <SelectableChip 
                        disabled={processing}
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