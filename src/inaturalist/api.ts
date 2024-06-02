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
        const body: ApiResult<Site> = await response.json();
        return body.results;
    }
}

