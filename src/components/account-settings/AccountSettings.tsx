import { Stack } from "@mantine/core";
import AuthenticationDetails from "../authentication-details/AuthenticationDetails";
import SiteCombobox from "../site-combobox/SiteCombobox";

export default function AccountSettings() {
	return (
		<Stack align="flex-start">
			<SiteCombobox label="iNaturalist Site" />
			<AuthenticationDetails />
		</Stack>
	);
}
