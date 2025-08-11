import { Chip, Group, Stack, Title } from "@mantine/core";
import UserAccount from "../../components/user-account/UserAccount";
import { EditableChipGroup } from "./EditableChipGroup";
import { useContext } from "react";
import { CurrentUserContext } from "../../Contexts";

interface AnnotationSelectorProps {
	observation: Observation;
	observationControlledTerms: ControlledTerm[];
	annotationFunctions?: AnnotationFunctions;
}

export function AnnotationSelector({
	observation,
	observationControlledTerms,
	annotationFunctions,
}: AnnotationSelectorProps) {
	const currentUser = useContext(CurrentUserContext);
	return (
		<Stack gap="md" pt={3} pl={3}>
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
