export const observationParams = Object.freeze({
	user_id: "user_id",
	taxon_id: "taxon_id",
	place_id: "place_id",
	without_term_id: "without_term_id",
});

const observationParamsWithFields = [
	observationParams.taxon_id,
	observationParams.place_id,
	observationParams.without_term_id,
];

export const observationParamsWithoutFields = (
	Object.values(observationParams) as string[]
).filter((x) => (observationParamsWithFields as string[]).includes(x));
