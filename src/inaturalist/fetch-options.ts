/* eslint-disable  @typescript-eslint/no-explicit-any */

const USER_AGENT = 'iNaturalist Tools (by agoranomos)';

export const getFetchOptions = () => {
    return {
        method: 'GET',
        headers: {
            'X-Via': USER_AGENT
        }
    };
};

export const postAuthFetchOptions = (bodyObj : any, authToken : string) => {
    return {
        method: 'POST',
        headers: {
            'X-Via': USER_AGENT,
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': authToken
        },
        body: JSON.stringify(bodyObj)
    };
};

export const getAuthFetchOptions = (authToken : string) => {
    return {
        method: 'GET',
        headers: {
            'X-Via': USER_AGENT,
            'Authorization': authToken
        }
    };
};

export const deleteAuthFetchOptions = (authToken : string) => {
    return {
        method: 'DELETE',
        headers: {
            'X-Via': USER_AGENT,
            'Authorization': authToken
        }
    };
};

export const postFetchOptions = (bodyObj : any) => {
    return {
        method: 'POST',
        headers: {
            'X-Via': USER_AGENT,
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(bodyObj)
    };
};