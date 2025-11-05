import { useLocalStorage } from "@mantine/hooks";
import { useEffect } from "react";
import { getCurrentUser } from "../inaturalist/api";

export function useCurrentUser(authentication: Authentication): User | null {
	const [currentUser, setCurrentUser] = useLocalStorage<User | null>({
		key: "current-user",
		defaultValue: null,
	});

	useEffect(() => {
		if (!authentication || !authentication.authToken) setCurrentUser(null);
		else getCurrentUser(authentication).then((user) => setCurrentUser(user));
	}, [authentication, setCurrentUser]);

	return currentUser;
}
