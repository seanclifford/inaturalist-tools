import {
	getFetchOptions,
	postAuthFetchOptions,
	deleteAuthFetchOptions,
} from "./fetch-options.js";
import { limit } from "./api-limiter.js";

function get(path: string): Promise<Response> {
	return limit(async () => {
		return await fetch(
			import.meta.env.VITE_INATURALIST_API_URL + path,
			getFetchOptions(),
		);
	});
}

function post<T>(
	path: string,
	bodyObj: T,
	authToken: string,
): Promise<Response> {
	return limit(async () => {
		return await fetch(
			import.meta.env.VITE_INATURALIST_API_URL + path,
			postAuthFetchOptions(bodyObj, authToken),
		);
	});
}

function remove(path: string, authToken: string): Promise<Response> {
	return limit(async () => {
		return await fetch(
			import.meta.env.VITE_INATURALIST_API_URL + path,
			deleteAuthFetchOptions(authToken),
		);
	});
}

export async function getSites() {
	const response = await get("sites/");
	if (!response.ok) {
		throw new Error("Could not load sites");
	}
	const body = (await response.json()) as ApiResult<Site>;
	return body.results;
}

export async function getObservations(query: URLSearchParams) {
	query.set("per_page", "24");
	const response = await get(`observations?${query.toString()}`);
	if (!response.ok) {
		throw new Error("Could not load observations");
	}
	const body = (await response.json()) as ApiResult<Observation>;
	return body.results;
}

export async function getObservation(id: number) {
	const response = await get(`observations/${id}`);
	if (!response.ok) {
		throw new Error("Could not load observation");
	}
	const body = (await response.json()) as ApiResult<Observation>;
	return body.results[0];
}

export async function getTaxa() {
	const response = await get("taxa/");
	if (!response.ok) {
		throw new Error("Could not load taxa");
	}
	const body = (await response.json()) as ApiResult<Taxon>;
	return body.results;
}

export async function getUsers() {
	const response = await get("users/");
	if (!response.ok) {
		throw new Error("Could not load users");
	}
	const body = (await response.json()) as ApiResult<User>;
	return body.results;
}

export async function getControlledTerms() {
	const response = await get("controlled_terms/");
	if (!response.ok) {
		throw new Error("Could not load controlled terms");
	}
	const body = (await response.json()) as ApiResult<ControlledTerm>;
	return body.results;
}

export async function addAnnotation(
	annotation: AddAnnotationParams,
	authentication: Authentication,
): Promise<NewAnnotation> {
	if (!authentication.isAuthenticated || !authentication.authToken) {
		throw new Error("Authentication is required to add an annotation");
	}

	const response = await post(
		"annotations/",
		annotation,
		authentication.authToken,
	);
	if (!response.ok) {
		throw new Error("Could not save annotation");
	}
	return (await response.json()) as NewAnnotation;
}

export async function deleteAnnotation(
	uuid: string,
	authentication: Authentication,
) {
	if (!authentication.isAuthenticated || !authentication.authToken) {
		throw new Error("Authentication is required to add an annotation");
	}
	const response = await remove(
		`annotations/${uuid}`,
		authentication.authToken,
	);
	if (!response.ok) {
		throw new Error("Could not delete annotation");
	}
}

/*
export async function getProjects() {
    const response = await get('projects/');
    if (!response.ok) {
        throw new Error('Could not load projects');
    } else {
        const body = await response.json() as ApiResult<Project>;
        return body.results;
    }
}*/
