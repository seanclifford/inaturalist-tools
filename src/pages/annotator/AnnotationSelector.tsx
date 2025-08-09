import { Chip, Group, Stack, Title } from "@mantine/core";
import UserAccount from "../../components/user-account/UserAccount";
import { EditableChipGroup } from "./EditableChipGroup";

interface AnnotationSelectorProps {
	observation: Observation;
	observationControlledTerms: ControlledTerm[];
	currentUser: User | null;
	annotationFunctions?: AnnotationFunctions;
}

export function AnnotationSelector({
	observation,
	observationControlledTerms,
	currentUser,
	annotationFunctions,
}: AnnotationSelectorProps) {
	return (
		<Stack gap="md">
			{observationControlledTerms.map((controlledTerm) => {
				const annotations = observation.annotations.filter(
					(a) => a.controlled_attribute_id === controlledTerm.id,
				);
				const othersAnnotations = annotations.filter(
					(a) => a.user_id !== currentUser?.id,
				);
				const yourAnnotations = annotations.filter(
					(a) => a.user_id === currentUser?.id,
				);
				return (
					<Stack gap="xs" key={controlledTerm.id}>
						<Title size="md">{controlledTerm.label}</Title>
						<Group gap="xs">
							{othersAnnotations.map((annotation) => (
								<Group gap="xs" key={annotation.uuid}>
									<Chip checked={true} variant="light">
										{
											controlledTerm.values.find(
												(t) => t.id === annotation.controlled_value_id,
											)?.label
										}
									</Chip>
									<UserAccount size="sm" user={annotation.user} />
								</Group>
							))}
							{othersAnnotations.length === 0 ||
							(controlledTerm.multivalued &&
								controlledTerm.values.length > othersAnnotations.length) ? (
								<EditableChipGroup
									observation={observation}
									controlledTerm={controlledTerm}
									yourAnnotations={yourAnnotations}
									othersAnnotations={othersAnnotations}
									annotationFunctions={annotationFunctions}
								/>
							) : null}
						</Group>
					</Stack>
				);
			})}
		</Stack>
	);
}
