import { useMutation } from "@tanstack/react-query";
import { addAnnotation, deleteAnnotation } from "../../inaturalist/api";
import { useControlledTerms } from "../../hooks/useControlledTerms";
import { useContext } from "react";
import { AuthContext, CurrentUserContext } from "../../Contexts";
import { useObservations } from "../../hooks/useObservations";

interface AnnotatorObservationResult {
	annotatorObservations?: AnnotatorObservation[];
	status: LoadingStatus;
	error?: Error;
	annotationFunctions?: AnnotationFunctions;
	loadMore?: () => void;
}

export function useAnnotatorObservations(
	submitedQueryString: string,
): AnnotatorObservationResult {
	const authentication = useContext(AuthContext);
	const currentUser = useContext(CurrentUserContext);

	const {
		status: observationStatus,
		data: observations,
		error: observationError,
		loadMore,
		replaceObservation,
	} = useObservations(submitedQueryString);
	const {
		status: controlledTermStatus,
		error: controlledTermsError,
		data: controlledTerms,
	} = useControlledTerms();

	const addAnnotationMutation = useMutation({
		mutationFn: (params: SaveAnnotationParams) => {
			return addAnnotation(
				{
					controlled_attribute_id: params.controlledTermId,
					controlled_value_id: params.controlledValueId,
					resource_id: params.observationId,
					resource_type: "Observation",
				},
				authentication,
			);
		},
		onError(error) {
			console.error(error);
		},
		onSuccess: (annotation: NewAnnotation) => {
			if (!currentUser) return;
			const observation = observations?.find(
				(obs) => obs.id === annotation.resource_id,
			);
			if (!observation) {
				console.error("Could not find observation to add annotation to");
				return;
			}
			const observationCopy = { ...observation };
			observationCopy.annotations.push({
				...annotation,
				vote_score: 0,
				user: currentUser,
			});
			replaceObservation?.(observationCopy);
		},
	});

	const deleteAnnotationMutation = useMutation({
		mutationFn: (params: DeleteAnnotationParams) => {
			return deleteAnnotation(params.annotationId, authentication);
		},
		onError(error) {
			console.error(error);
		},
		onSuccess: (_, params: DeleteAnnotationParams) => {
			const observation = observations?.find(
				(obs) => obs.id === params.observationId,
			);
			if (!observation) {
				console.error("Could not find observation to add annotation to");
				return;
			}
			const observationCopy = { ...observation };
			observationCopy.annotations = observationCopy.annotations.filter(
				(a) => a.uuid !== params.annotationId,
			);
			replaceObservation?.(observationCopy);
		},
	});

	if (observationStatus === "pending" || controlledTermStatus === "pending")
		return { status: "pending" };
	if (observationStatus === "error")
		return { status: "error", error: observationError ?? undefined };
	if (controlledTermStatus === "error")
		return { status: "error", error: controlledTermsError };

	const annotatorObservations = observations
		.map((observation) => {
			return {
				observation: observation,
				controlledTerms: getTaxonControlledTerms(
					observation.taxon,
					controlledTerms,
				),
			} as AnnotatorObservation;
		})
		.filter(
			(annotatorObservation) => annotatorObservation.controlledTerms.length > 0,
		);

	return {
		annotatorObservations,
		status: "success",
		annotationFunctions: {
			saveAnnotation: addAnnotationMutation.mutateAsync,
			deleteAnnotation: deleteAnnotationMutation.mutateAsync,
		},
		loadMore,
	};
}

function getTaxonControlledTerms(
	taxon: Taxon,
	controlledTerms: ControlledTerm[],
): ControlledTerm[] {
	const taxonControlledTerms: ControlledTerm[] = [];
	if (!taxon) return taxonControlledTerms;

	for (const controlledTerm of controlledTerms) {
		if (!controlledTermAppliesToTaxon(taxon, controlledTerm)) continue;
		const controlledTermValues: ControlledTermValue[] = [];
		for (const controlledTermValue of controlledTerm.values) {
			if (controlledTermAppliesToTaxon(taxon, controlledTermValue))
				controlledTermValues.push(controlledTermValue);
		}
		if (controlledTermValues.length > 0)
			taxonControlledTerms.push({
				...controlledTerm,
				values: controlledTermValues,
			});
	}

	return taxonControlledTerms;
}

function controlledTermAppliesToTaxon(
	taxon: Taxon,
	controlledTerm: ControlledTermBase,
) {
	const included =
		!controlledTerm.taxon_ids ||
		controlledTerm.taxon_ids.some((x) => taxon?.ancestor_ids?.includes(x));
	if (!included) {
		return false;
	}
	const excepted = controlledTerm.excepted_taxon_ids?.some((x) =>
		taxon?.ancestor_ids?.includes(x),
	);
	return !excepted;
}
