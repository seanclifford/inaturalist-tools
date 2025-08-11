import { useEffect, useRef, useState } from "react";
import {
	authenticate,
	getApiToken,
	requestApiToken,
	isAuthenticated,
	getApiTokenExpiry,
} from "../inaturalist/auth";

export default function useAuthentication(
	currentSite: Site,
): [Authentication, () => void] {
	const [authentication, saveAuthentication] = useState(() =>
		loadAuthenticationFromStore(),
	);
	const refreshAuthTimeoutId = useRef(undefined as NodeJS.Timeout | undefined);

	useEffect(() => {
		if (authentication.isAuthenticated) {
			const tokenExpiresIn = authentication.authToken
				? getApiTokenExpiry(authentication.authToken) - Date.now() - 60000 // Subtract 1 minute for safety
				: 0;

			if (tokenExpiresIn <= 0) {
				refreshAuthToken(currentSite, authentication, saveAuthentication);
			} else {
				refreshAuthTimeoutId.current = setTimeout(
					() =>
						refreshAuthToken(currentSite, authentication, saveAuthentication),
					tokenExpiresIn,
				);
			}
		} else {
			clearTimeout(refreshAuthTimeoutId.current);
		}
		return () => {
			clearTimeout(refreshAuthTimeoutId.current);
		};
	}, [authentication, currentSite]);

	function logout() {
		saveAuthentication(unauthenticated());
	}

	return [authentication, logout];
}

function refreshAuthToken(
	currentSite: Site,
	authentication: Authentication,
	saveAuthentication: (auth: Authentication) => void,
) {
	requestApiToken(currentSite).then((apiToken) => {
		if (apiToken) {
			saveAuthentication({
				...authentication,
				authToken: apiToken,
			});
		}
	});
}

function loadAuthenticationFromStore(): Authentication {
	if (!isAuthenticated()) {
		return { ...unauthenticated(), authToken: import.meta.env.VITE_AUTH_TOKEN };
	}

	const authToken = getApiToken();

	return {
		isAuthenticated: true,
		authToken: authToken,
		login: authenticate,
	};
}

export function unauthenticated(): Authentication {
	return {
		isAuthenticated: false,
		login: authenticate,
	};
}
