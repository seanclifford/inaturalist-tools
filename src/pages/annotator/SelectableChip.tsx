import { Chip } from "@mantine/core";

interface SelectableChipProps {
    observation: Observation,
    controlledTerm: ControlledTerm,
    controlledValue: ControlledTermValue,
    yourAnnotations: Annotation[]
    annotationFunctions?: AnnotationFunctions
}

export default function SelectableChip({observation, controlledTerm, controlledValue, yourAnnotations, annotationFunctions}: SelectableChipProps) {

    const {saveAnnotation, deleteAnnotation} = annotationFunctions || {};
    
    return (
        <Chip 
            value={controlledValue.id} 
            checked={yourAnnotations.some(annotation => annotation?.controlled_value_id === controlledValue.id)}
            onChange={async (checked) => {
                if (checked && saveAnnotation) {
                    await saveAnnotation({observationId: observation.id, controlledTermId:controlledTerm.id, controlledValueId:controlledValue.id});
                } else {
                    const annotation = yourAnnotations.find(a => a.controlled_value_id === controlledValue.id);
                    if (annotation && deleteAnnotation) {
                        await deleteAnnotation({observationId: observation.id, annotationId: annotation.uuid});
                    }
                }
            }}>
            {controlledValue.label}
        </Chip>
    );
}