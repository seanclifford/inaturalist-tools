import { AuthenticationError } from "../errors/AuthenticationError.ts";
import { limit } from "./api-limiter.ts";
import {
	annotationApiFields,
	controlledTermsApiFields,
	observationApiFields,
	placeApiFields,
	siteApiFields,
	taxonApiFields,
	userApiFields,
} from "./constants.ts";
import {
	deleteAuthFetchOptions,
	getAuthFetchOptions,
	getFetchOptions,
	postAuthFetchOptions,
} from "./fetch-options.ts";

function get(path: string, useCache = true): Promise<Response> {
	return limit(async () => {
		return await fetch(
			import.meta.env.VITE_INATURALIST_API_URL + path,
			getFetchOptions(useCache),
		);
	});
}

function getAuth(
	path: string,
	authToken: string,
	useCache = true,
): Promise<Response> {
	return limit(async () => {
		return await fetch(
			import.meta.env.VITE_INATURALIST_API_URL + path,
			getAuthFetchOptions(authToken, useCache),
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

export async function getCurrentUser(authentication: Authentication) {
	if (!authentication.authToken) {
		throw new Error("Authentication is required to get current user");
	}
	const query = new URLSearchParams([["fields", userApiFields]]);
	const response = await getAuth(`users/me?${query}`, authentication.authToken);
	if (!response.ok) {
		throw new Error("Could not load current user");
	}
	const body = (await response.json()) as ApiResult<User>;
	return body.results[0];
}

export async function getUser(id: string | null) {
	if (!id) return null;
	if (id.includes(",")) return { id: -12345, name: "Multiple Users" } as User;
	const idNumber = Number(id);
	if (!idNumber) return null;

	const query = new URLSearchParams([["fields", userApiFields]]);

	const response = await get(`users/${idNumber}?${query}`);
	if (!response.ok) {
		throw new Error("Could not load user");
	}
	const body = (await response.json()) as ApiResult<User>;
	return body.results[0];
}

export async function getUsersAutocomplete(query: URLSearchParams) {
	query.append("fields", userApiFields);

	const response = await get(`users/autocomplete?${query.toString()}`);
	if (!response.ok) {
		throw new Error("Could not load users");
	}
	const body = (await response.json()) as ApiResult<User>;
	return body.results;
}

export async function getSites() {
	const query = new URLSearchParams([["fields", siteApiFields]]);
	const response = await get(`sites?${query}`);
	if (!response.ok) {
		throw new Error("Could not load sites");
	}
	const body = (await response.json()) as ApiResult<Site>;
	return body.results;
}

export async function getObservations(
	query: URLSearchParams,
	authentication: Authentication,
) {
	const pageSize = 30;
	query.set("per_page", pageSize.toString());
	query.append("fields", observationApiFields);
	const path = `observations?${query.toString()}`;
	const response = authentication.authToken
		? await getAuth(path, authentication.authToken, false)
		: await get(path, true);
	if (!response.ok) {
		throw new Error("Could not load observations");
	}
	const body = (await response.json()) as ApiResult<Observation>;
	return {
		results: body.results,
		pages: Math.ceil(body.total_results / pageSize),
	};
}

export async function getTaxon(id: string | null, query: URLSearchParams) {
	if (!id) return null;
	if (id.includes(",")) return { id: -12345, name: "Multiple Taxons" } as Taxon;
	const idNumber = Number(id);
	if (!idNumber) return null;

	query.append("fields", taxonApiFields);

	const response = await get(`taxa/${idNumber}?${query}`);
	if (!response.ok) {
		throw new Error("Could not load taxon");
	}
	const body = (await response.json()) as ApiResult<Taxon>;
	return body.results[0];
}

export async function getTaxaAutocomplete(query: URLSearchParams) {
	query.append("fields", taxonApiFields);

	const response = await get(`taxa/autocomplete?${query.toString()}`);
	if (!response.ok) {
		throw new Error("Could not load taxa");
	}
	const body = (await response.json()) as ApiResult<Taxon>;
	return body.results;
}

export async function getControlledTerms() {
	const query = new URLSearchParams([["fields", controlledTermsApiFields]]);
	const response = await get(`controlled_terms?${query}`);
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
	if (!authentication.authToken) {
		throw new AuthenticationError(
			"Authentication is required to add an annotation",
		);
	}
	const query = new URLSearchParams([["fields", annotationApiFields]]);

	const response = await post(
		`annotations?${query}`,
		annotation,
		authentication.authToken,
	);
	if (!response.ok) {
		throw new Error("Could not save annotation");
	}
	const body = (await response.json()) as ApiResult<NewAnnotation>;
	return body.results[0];
}

export async function deleteAnnotation(
	uuid: string,
	authentication: Authentication,
) {
	if (!authentication.authToken || !authentication.isAuthenticated) {
		throw new AuthenticationError(
			"Authentication is required to add an annotation",
		);
	}
	const response = await remove(
		`annotations/${uuid}`,
		authentication.authToken,
	);
	if (!response.ok) {
		throw new Error("Could not delete annotation");
	}
}

export async function getPlace(id: string | null, query: URLSearchParams) {
	if (!id) return null;
	if (id.includes(","))
		return { id: -123456, display_name: "Multiple Places" } as Place;
	const idNumber = Number(id);
	if (!idNumber) return null;

	query.append("fields", placeApiFields);

	const response = await get(`places/${idNumber}?${query.toString()}`);
	if (!response.ok) {
		throw new Error("Could not load place");
	}
	const body = (await response.json()) as ApiResult<Place>;
	return body.results[0];
}

export async function getPlacesAutocomplete(query: URLSearchParams) {
	query.append("fields", placeApiFields);
	const response = await get(`places?${query.toString()}`);
	if (!response.ok) {
		throw new Error("Could not load places");
	}
	const body = (await response.json()) as ApiResult<Place>;
	return body.results;
}
