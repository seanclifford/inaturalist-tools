export const observationParams = Object.freeze({
	taxon_id: "taxon_id",
	place_id: "place_id",
	user_id: "user_id",
	project_id: "project_id",
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

export const placeApiFields = "id,display_name";

export const userApiFields = "(id:!t,login:!t,name:!t,icon:!t)";

export const projectApiFields = "id,title,icon";

const photosApiFields = "(id:!t,url:!t)";
const soundApiFields = "(id:!t,file_url:!t)";
export const annotationApiFields = `(id:!t,uuid:!t,vote_score:!t,controlled_attribute_id:!t,controlled_value_id:!t,user:${userApiFields})`;

export const observationApiFields = `(id:!t,taxon:${taxonApiFields},user:${userApiFields},photos:${photosApiFields},sounds:${soundApiFields},annotations:${annotationApiFields})`;
