import { useLocalStorage } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { getCurrentUser } from "../inaturalist/api";
import { getUserIdFromToken } from "../inaturalist/auth";

export function useCurrentUser(authentication: Authentication): User | null {
	const [currentUser, setCurrentUser, removeCurrentUser] =
		useLocalStorage<User | null>({
			key: "current-user",
			defaultValue: null,
			getInitialValueInEffect: false,
		});

	const queryClient = useQueryClient();
	useEffect(() => {
		if (!authentication || !authentication.authToken) {
			if (currentUser) {
				console.log("Clearing current user from storage");
				removeCurrentUser();
			}
		} else {
			const authUserId = getUserIdFromToken(authentication.authToken);
			if (currentUser?.id !== authUserId) {
				console.log(
					`Reloading user due to id change from:${currentUser?.id} to:${authUserId}`,
				);
				getCurrentUser(authentication).then((user) => {
					setCurrentUser(user);
				});
			}
		}
	}, [authentication, setCurrentUser, removeCurrentUser, currentUser]);

	if (currentUser)
		queryClient.setQueryData(["user", currentUser.id.toString()], currentUser);

	return currentUser;
}
