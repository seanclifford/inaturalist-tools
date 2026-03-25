import { Tabs } from "@mantine/core";
import AccountSettings from "../account-settings/AccountSettings";
import ObservationFilter from "../observation-filter/ObservationFilter";
import AboutSection from "./AboutSection";
import HelpSection from "./HelpSection";

interface SettingsProps {
	pageQueryString: string;
	runQuery: (_: string) => void;
}

export default function Settings({ pageQueryString, runQuery }: SettingsProps) {
	return (
		<Tabs variant="outline" defaultValue="filters">
			<Tabs.List>
				<Tabs.Tab value="filters">Filters</Tabs.Tab>
				<Tabs.Tab value="account">Account</Tabs.Tab>
				<Tabs.Tab value="help">Help</Tabs.Tab>
				<Tabs.Tab value="about">About</Tabs.Tab>
			</Tabs.List>

			<Tabs.Panel value="filters" px="0" pt="xs">
				<ObservationFilter
					pageQueryString={pageQueryString}
					runQuery={runQuery}
				/>
			</Tabs.Panel>

			<Tabs.Panel value="account" p="md">
				<AccountSettings />
			</Tabs.Panel>

			<Tabs.Panel value="help" p="md">
				<HelpSection />
			</Tabs.Panel>

			<Tabs.Panel value="about" p="md">
				<AboutSection />
			</Tabs.Panel>
		</Tabs>
	);
}
