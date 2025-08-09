interface ApiResult<T> {
	total_results: number;
	page: number;
	per_page: number;
	results: T[];
}

interface Authentication {
	isAuthenticated: boolean;
	authToken?: string | null;
	login: (currentSite: Site, returnLocation: string) => void;
}

interface Site {
	id: number;
	name: string;
	site_name_short: string;
	url: string;
	icon_url: string;
	place_id?: number;
	locale?: string;
}

interface User {
	id: number;
	login: string;
	name: string;
	icon: string;
}

interface Observation {
	id: number;
	taxon: Taxon;
	description: string;
	observed_on: Date;
	user: User;
	photos: Photo[];
	sounds: Sound[];
	indent_ancestor_ids: number[];
	annotations: Annotation[];
}

interface Taxon {
	id: number;
	name: string;
	preferred_common_name: string;
	default_photo: TaxonPhoto;
	ancestor_ids: number[];
}

interface TaxonPhoto {
	id: number;
	square_url: string;
	medium_url: string;
}

interface Photo {
	id: number;
	url: string;
	attribution: string;
}

interface Sound {
	id: number;
	file_url: string;
	attribution: string;
}

interface ObservationFieldValue {
	id: number;
	observation_field: ObservationField;
	value: string;
}

interface ObservationField {
	id: number;
	name: string;
	datatype: string;
	description: string;
}

interface Project {
	id: number;
	title: string;
	description: string;
	icon: string;
	project_type: string;
	created_at: Date;
	updated_at: Date;
}

interface Comment {
	id: number;
	body: string;
	created_at: Date;
	updated_at: Date;
	user: User;
}

interface Identification {
	id: number;
	taxon: Taxon;
	user: User;
	created_at: Date;
	updated_at: Date;
	body: string;
}

interface Annotation extends AnnotationBase {
	id: number;
	uuid: string;
	vote_score: number;
	user_id: number;
	user: User;
}

interface ControlledTermBase {
	id: number;
	label: string;
	taxon_ids: number[];
	excepted_taxon_ids: number[];
}

interface ControlledTerm extends ControlledTermBase {
	multivalued: boolean;
	values: ControlledTermValue[];
}

interface ControlledTermValue extends ControlledTermBase {
	blocking: boolean;
}
