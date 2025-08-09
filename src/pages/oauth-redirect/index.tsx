import { Center } from "@mantine/core";
import {performAccessTokenRequest, redirectToPreAuthLocation } from "../../inaturalist/auth";
import { useEffect, useState } from "react";

interface OauthRedirectProps {
	site: Site;
	authentication: Authentication;
    setAuthentication: React.Dispatch<React.SetStateAction<Authentication>>;
}

function OauthRedirect({site, authentication, setAuthentication}: OauthRedirectProps) {

    const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>("pending");

    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code');

    
    useEffect(() => {
        if (!authCode) {
            alert("Authentication failed, please try again.");
            redirectToPreAuthLocation();
        }
        else
            performAccessTokenRequest(site, authCode, setLoadingStatus);
    }, [site, authCode]);

	return (
        <main>
		<Center>
			<b>Retreiving authentication details...</b>
		</Center>
        </main>
	);
}

export default OauthRedirect;
