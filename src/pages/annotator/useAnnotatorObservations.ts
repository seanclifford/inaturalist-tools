import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	addAnnotation,
	deleteAnnotation,
	getObservations,
} from "../../inaturalist/api";
import { useControlledTerms } from "../../hooks/useControlledTerms";

interface AnnotatorObservationResult {
	annotatorObservations?: AnnotatorObservation[];
	status: "sucess" | "error" | "pending";
	error?: Error;
	annotationFunctions?: AnnotationFunctions;
}

export function useAnnotatorObservations(
	submitedQueryString: string,
	site: Site,
	currentUser?: User,
): AnnotatorObservationResult {
	const generateQueryString = (query: string): URLSearchParams => {
		const searchParams = new URLSearchParams(query);
		searchParams.append("locale", site.locale ?? navigator.language);
		if (site.place_id)
			searchParams.append("preferred_place_id", site.place_id.toString());
		return searchParams;
	};

	const {
		status: observationStatus,
		data: observations,
		error: observationError,
	} = useQuery({
		queryKey: ["observations", submitedQueryString],
		queryFn: () => getObservations(generateQueryString(submitedQueryString)),
	});
	const {
		status: controlledTermStatus,
		error: controlledTermsError,
		data: controlledTerms,
	} = useControlledTerms();

	const queryClient = useQueryClient();
	const addAnnotationMutation = useMutation({
		mutationFn: (params: SaveAnnotationParams) => {
			return addAnnotation({
				controlled_attribute_id: params.controlledTermId,
				controlled_value_id: params.controlledValueId,
				resource_id: params.observationId,
				resource_type: "Observation",
			});
		},
		onError(error) {
			console.error(error);
		},
		onSuccess: (annotation: NewAnnotation) => {
			const observationsRefreshed = observations?.map((obs) => {
				const observationCopy = { ...obs };
				if (annotation.resource_id === obs.id)
					observationCopy.annotations.push({
						...annotation,
						vote_score: 0,
						user: currentUser!,
					});
				return observationCopy;
			});
			queryClient.setQueryData(
				["observations", submitedQueryString],
				observationsRefreshed,
			);
		},
	});

	const deleteAnnotationMutation = useMutation({
		mutationFn: (params: DeleteAnnotationParams) => {
			return deleteAnnotation(params.annotationId);
		},
		onError(error) {
			console.error(error);
		},
		onSuccess: (_, params: DeleteAnnotationParams) => {
			const observationsRefreshed = observations?.map((obs) => {
				const observationCopy = { ...obs };
				if (params.observationId === obs.id) {
					observationCopy.annotations = observationCopy.annotations.filter(
						(a) => a.uuid !== params.annotationId,
					);
				}
				return observationCopy;
			});
			queryClient.setQueryData(
				["observations", submitedQueryString],
				observationsRefreshed,
			);
		},
	});

	if (observationStatus === "pending" || controlledTermStatus === "pending")
		return { status: "pending" };
	if (observationStatus === "error")
		return { status: "error", error: observationError };
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
				status: "success",
			} as AnnotatorObservation;
		})
		.filter(
			(annotatorObservation) => annotatorObservation.controlledTerms.length > 0,
		);

	return {
		annotatorObservations,
		status: "sucess",
		annotationFunctions: {
			saveAnnotation: addAnnotationMutation.mutateAsync,
			deleteAnnotation: deleteAnnotationMutation.mutateAsync,
		},
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
