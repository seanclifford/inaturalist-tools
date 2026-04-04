export const observationParams = Object.freeze({
	taxon_id: "taxon_id",
	place_id: "place_id",
	without_term_id: "without_term_id",
	photos: "photos",
	reviewed: "reviewed",
	viewer_id: "viewer_id",
});

export const observationParamsWithFields = Object.values(
	observationParams,
) as string[];
