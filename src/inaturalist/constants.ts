export const observationParams = Object.freeze({
	taxon_id: "taxon_id",
	place_id: "place_id",
	without_term_id: "without_term_id",
	photos: "photos",
});

export const observationParamsWithFields = Object.values(
	observationParams,
) as string[];
