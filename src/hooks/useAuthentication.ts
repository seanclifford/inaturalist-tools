import { useEffect, useState } from "react";

interface Authentication {
    isAuthenticated: boolean
    authToken?: string
    currentUser?: User
}

export default function useAuthentication() : [Authentication, React.Dispatch<React.SetStateAction<Authentication>>] {
    const [authentication, saveAuthentication] = useState(loadAuthenticationFromStore());

    useEffect(() => { saveAuthenticationToStore(authentication) }, [authentication]);

    return [authentication, saveAuthentication];
}

function loadAuthenticationFromStore(): Authentication {
    const localStorageSiteJson = localStorage.getItem("authentication");
    
    return localStorageSiteJson ? JSON.parse(localStorageSiteJson) as Authentication : defaultAuthentication();
}

function saveAuthenticationToStore(site: Authentication)
{
    localStorage.setItem("authentication", JSON.stringify(site));
}

function defaultAuthentication() : Authentication {
    /*return {
        isAuthenticated: false,
    };*/
    return { //temp user before full implementation
        isAuthenticated: true,
        authToken: "fake-auth-token",
        currentUser: {
            id: 2259721,
            login: "agoranomos",
            name: "Sean Clifford",
            icon: "https://static.inaturalist.org/attachments/users/icons/2259721/thumb.jpg?1608018428",
        }
    };
}