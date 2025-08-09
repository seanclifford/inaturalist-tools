import { Center } from "@mantine/core";
import {performAccessTokenRequest, redirectToPreAuthLocation } from "../../inaturalist/auth";
import { useEffect, useState } from "react";
import useSite from "../../hooks/useSite";

function OauthRedirect() {

    const [site] = useSite();
    const [_, setLoadingStatus] = useState<LoadingStatus>("pending");

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
