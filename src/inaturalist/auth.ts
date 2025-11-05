import { limit } from "./api-limiter.js";
import { getAuthFetchOptions, postFetchOptions } from "./fetch-options";

const AUTH_VERIFIER = "auth_verifier";
const AUTH_ACCESS_TOKEN = "auth_access_token";
const AUTH_API_TOKEN = "auth_api_token";
const PRE_AUTH_LOCATION = "pre_auth_location";

const OAUTH_APPLICATION_ID = import.meta.env.VITE_OAUTH_APPLICATION_ID;
const REDIRECT_URI = `${import.meta.env.VITE_THIS_SITE_URL}/oauth-redirect`;

export function isAuthenticated() {
	return !!localStorage.getItem(AUTH_ACCESS_TOKEN);
}

export async function authenticate(currentSite: Site) {
	sessionStorage.setItem(PRE_AUTH_LOCATION, window.location.href);

	const verifier = generateRandomString();
	sessionStorage.setItem(AUTH_VERIFIER, verifier);

	const challenge = await pkceChallengeFromVerifier(verifier);

	const redirect = `${currentSite.url}/oauth/authorize?client_id=${OAUTH_APPLICATION_ID}&code_challenge=${challenge}&code_challenge_method=S256&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code`;
	window.location.href = redirect;
}

export function getApiToken() {
	const apiToken = sessionStorage.getItem(AUTH_API_TOKEN);

	if (apiToken && !tokenIsExpired(apiToken)) {
		return apiToken;
	}

	return null;
}

export function getApiTokenExpiry(token: string): number {
	const payload = JSON.parse(atob(token.split(".")[1]));
	return payload.exp * 1000; // Convert to milliseconds
}

function tokenIsExpired(token: string): boolean {
	return getApiTokenExpiry(token) > Date.now();
}

export async function requestApiToken(currentSite: Site) {
	const accessToken = localStorage.getItem(AUTH_ACCESS_TOKEN);

	if (!accessToken) {
		return null;
	}

	const getOptions = getAuthFetchOptions(`Bearer ${accessToken}`);
	const response = await limit(() => {
		return fetch(`${currentSite.url}/users/api_token`, getOptions);
	});

	if (!response.ok) {
		console.log("Failed during request to get the api token");
	} else {
		const body = await response.json();
		const apiToken = body.api_token;
		sessionStorage.setItem(AUTH_API_TOKEN, apiToken);
		return apiToken;
	}
}

export async function performAccessTokenRequest(
	currentSite: Site,
	auth_code: string,
	setLoadingStatus: React.Dispatch<React.SetStateAction<LoadingStatus>>,
) {
	const verifier = sessionStorage.getItem(AUTH_VERIFIER);
	const payload = {
		client_id: OAUTH_APPLICATION_ID,
		code: auth_code,
		grant_type: "authorization_code",
		redirect_uri: REDIRECT_URI,
		code_verifier: verifier,
	};
	const postOptions = postFetchOptions(payload);

	limit(() => {
		return fetch(`${currentSite.url}/oauth/token`, postOptions);
	})
		.then(async (response) => {
			if (!response.ok) {
				console.log("Failed during request to get the access token");
				setLoadingStatus("error");
				return;
			}
			const tokenResponse = await response.json();
			localStorage.setItem(AUTH_ACCESS_TOKEN, tokenResponse.access_token);
			sessionStorage.removeItem(AUTH_VERIFIER);
			setLoadingStatus("success");
		})
		.catch((error) => {
			console.log(error.message);
			setLoadingStatus("error");
		});
}

export function redirectToPreAuthLocation() {
	const preAuthLocation =
		sessionStorage.getItem(PRE_AUTH_LOCATION) ??
		import.meta.env.VITE_THIS_SITE_URL;
	sessionStorage.removeItem(PRE_AUTH_LOCATION);
	window.location.replace(preAuthLocation);
}

export function clearAllAuthenticationState() {
	sessionStorage.removeItem(AUTH_VERIFIER);
	localStorage.removeItem(AUTH_ACCESS_TOKEN);
	sessionStorage.removeItem(AUTH_API_TOKEN);
	sessionStorage.removeItem(PRE_AUTH_LOCATION);
}

//Below this line is some code pulled from https://github.com/aaronpk/pkce-vanilla-js with some minor modifications
/*
MIT License

Copyright (c) 2019 Aaron Parecki

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
//////////////////////////////////////////////////////////////////////
// PKCE HELPER FUNCTIONS

// Generate a secure random string using the browser crypto functions
function generateRandomString(): string {
	const array = new Uint32Array(28);
	window.crypto.getRandomValues(array);
	return Array.from(array, (dec) => `0${dec.toString(16)}`.substr(-2)).join("");
}

// Calculate the SHA256 hash of the input text.
// Returns a promise that resolves to an ArrayBuffer
function sha256(plain: string) {
	const encoder = new TextEncoder();
	const data = encoder.encode(plain);
	return window.crypto.subtle.digest("SHA-256", data);
}

// Base64-urlencodes the input string
function base64urlencode(str: ArrayBuffer) {
	// Convert the ArrayBuffer to string using Uint8 array to conver to what btoa accepts.
	// btoa accepts chars only within ascii 0-255 and base64 encodes them.
	// Then convert the base64 encoded to base64url encoded
	//   (replace + with -, replace / with _, trim trailing =)
	return btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(str))))
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=+$/, "");
}

// Return the base64-urlencoded sha256 hash for the PKCE challenge
async function pkceChallengeFromVerifier(v: string): Promise<string> {
	const hashed = await sha256(v);
	return base64urlencode(hashed);
}
