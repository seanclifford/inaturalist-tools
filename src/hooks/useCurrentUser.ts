import { useLocalStorage } from "@mantine/hooks";
import { useEffect } from "react";
import { getCurrentUser } from "../inaturalist/api";
import { getUserIdFromToken } from "../inaturalist/auth";

export function useCurrentUser(authentication: Authentication): User | null {
	const [currentUser, setCurrentUser] = useLocalStorage<User | null>({
		key: "current-user",
		defaultValue: null,
	});

	useEffect(() => {
		if (!authentication || !authentication.authToken) {
			if (currentUser) setCurrentUser(null);
		} else if (
			currentUser?.id !== getUserIdFromToken(authentication.authToken)
		) {
			getCurrentUser(authentication).then((user) => {
				setCurrentUser(user);
			});
		}
	}, [authentication, setCurrentUser, currentUser]);

	return currentUser;
}
