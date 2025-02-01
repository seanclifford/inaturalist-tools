import { getFetchOptions } from "./fetch-options.js";
import { limit } from "./api-limiter.js";

async function get(path: string) : Promise<Response>
{
    return await limit(async () => {return await fetch(import.meta.env.VITE_INATURALIST_API_URL + path, getFetchOptions());});
}

export async function getSites() {
    const response = await get('sites/');
    if (!response.ok) {
        throw new Error('Could not load sites');
    }
    else {
        const body = await response.json() as ApiResult<Site>;
        return body.results;
    }
}

export async function getObservations() {
    const response = await get('observations/');
    if (!response.ok) {
        throw new Error('Could not load observations');
    }
    else {
        const body = await response.json() as ApiResult<Observation>;
        return body.results;
    }
}

export async function getObservation(id: number) {
    const response = await get(`observations/${id}`);
    if (!response.ok) {
        throw new Error('Could not load observation');
    }
    else {
        const body = await response.json() as ApiResult<Observation>;
        return body.results[0];
    }
}

export async function getTaxa() {
    const response = await get('taxa/');
    if (!response.ok) {
        throw new Error('Could not load taxa');
    } else {
        const body = await response.json() as ApiResult<Taxon>;
        return body.results;
    }
}

export async function getUsers() {
    const response = await get('users/');
    if (!response.ok) {
        throw new Error('Could not load users');
    } else {
        const body = await response.json() as ApiResult<User>;
        return body.results;
    }
}

export async function getControlledTerms() {
    const response = await get('controlled_terms/');
    if (!response.ok) {
        throw new Error('Could not load controlled terms');
    } else {
        const body = await response.json() as ApiResult<ControlledTerm>;
        return body.results;
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