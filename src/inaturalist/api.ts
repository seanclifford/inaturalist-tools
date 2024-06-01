import { getFetchOptions } from "./fetch-options.js";
import { limit } from "./api-limiter.js";

//const API_ENDPOINT = 'http://localhost:4000/v1/';
const API_ENDPOINT = 'https://api.inaturalist.org/v1/';

async function get(path: string) : Promise<Response>
{
    return await limit(async () => {return await fetch(API_ENDPOINT + path, getFetchOptions());});
}

export const Api = {
    getSites: async function() {
        let response = await get('sites/');
        if (!response.ok) {
            return {
                status: 'ERROR',
                message: 'Could not load sites'
            }
        }
        else {
            let body: ApiResult<Site> = await response.json();
            return body.results;
        }
    }
}
