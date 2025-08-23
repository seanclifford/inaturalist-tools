import { useContext } from "react";
import { AuthContext, CurrentUserContext, SiteContext } from "../../Contexts";
import { Button, Group, Stack } from "@mantine/core";
import UserAccount from "../user-account/UserAccount";

export default function AuthenticationDetails() {
    const [site] = useContext(SiteContext);
    const auth = useContext(AuthContext);
    const currentUser = useContext(CurrentUserContext);
    return ( <Stack>
        <Group>
            {auth?.isAuthenticated ? ("Logged in as:") : ("Not logged in")}
            {currentUser ? <UserAccount user={currentUser} size="md"/> : null}
        </Group>
        <Button maw="200" onClick={auth?.isAuthenticated ? auth.logout : () => auth.login(site)}>{auth?.isAuthenticated ? "Logout" : "Login"}</Button>
    </Stack>);
}