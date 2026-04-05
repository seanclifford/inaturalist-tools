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

export const taxonApiFields =
	"(id:!t,name:!t,preferred_common_name:!t,ancestor_ids:!t,rank:!t,rank_level:!t,default_photo:(id:!t,square_url:!t))";

export const siteApiFields = "id,name,url,icon_url,place_id,locale";

export const controlledTermsApiFields =
	"(id:!t,label:!t,taxon_ids:!t,excepted_taxon_ids:!t,multivalued:!t,values:(id:!t,label:!t,taxon_ids:!t,excepted_taxon_ids:!t,blocking:!t))";
