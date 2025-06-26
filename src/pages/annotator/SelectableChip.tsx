import { Chip } from "@mantine/core";
import { useState } from "react";

interface SelectableChipProps {
	disabled: boolean;
	observation: Observation;
	controlledTerm: ControlledTerm;
	controlledValue: ControlledTermValue;
	yourAnnotations: Annotation[];
	annotationFunctions?: AnnotationFunctions;
}

export default function SelectableChip({
	disabled,
	observation,
	controlledTerm,
	controlledValue,
	yourAnnotations,
	annotationFunctions,
}: SelectableChipProps) {
	const [processing, setProcessing] = useState(false);

	const { saveAnnotation, deleteAnnotation } = annotationFunctions ?? {};

	const checked = yourAnnotations.some(
		(annotation) => annotation?.controlled_value_id === controlledValue.id,
	);

	return (
		<Chip
			value={controlledValue.id}
			checked={checked}
			disabled={disabled}
			onChange={() => {
				if (!checked && saveAnnotation) {
					setProcessing(true);
					saveAnnotation({
						observationId: observation.id,
						controlledTermId: controlledTerm.id,
						controlledValueId: controlledValue.id,
					})
						.finally(() => setProcessing(false))
						.catch(console.error);
				} else {
					const annotation = yourAnnotations.find(
						(a) => a.controlled_value_id === controlledValue.id,
					);
					if (annotation && deleteAnnotation) {
						setProcessing(true);
						deleteAnnotation({
							observationId: observation.id,
							annotationId: annotation.uuid,
						})
							.finally(() => setProcessing(false))
							.catch(console.error);
					}
				}
			}}
		>
			{processing ? "..." : ""}
			{controlledValue.label}
		</Chip>
	);
}
