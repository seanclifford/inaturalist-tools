import {
	Center,
	Combobox,
	Group,
	Image,
	Input,
	InputBase,
	Text,
	useCombobox,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { SiteContext } from "../../Contexts";
import { oneDay } from "../../constants/values";
import { getSites } from "../../inaturalist/api";

interface SiteComboboxProps {
	label: string;
}

function SelectOption({ name, url, icon_url }: Site) {
	return (
		<Group w="18em">
			<Image src={icon_url} h="2em" w="2em" />
			<div>
				<Text fz="sm" fw={500}>
					{name}
				</Text>
				<Text fz="xs" opacity={0.6}>
					{url}
				</Text>
			</div>
		</Group>
	);
}

export default function SiteCombobox({ label }: SiteComboboxProps) {
	const [currentSite, setCurrentSite] = useContext(SiteContext);
	const { isFetched, data: sites } = useQuery({
		queryKey: ["sites"],
		queryFn: getSites,
		staleTime: oneDay,
	});

	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption(),
	});

	const selectedOption = isFetched
		? sites?.find((site) => site.id === currentSite.id)
		: null;

	const options = sites?.map((site) => (
		<Combobox.Option value={site.id.toString()} key={site.id}>
			<SelectOption {...site} />
		</Combobox.Option>
	));

	return (
		<Combobox
			store={combobox}
			withinPortal={false}
			onOptionSubmit={(siteId) => {
				const chosenSite = sites?.find((x) => x.id.toString() === siteId);
				if (chosenSite) setCurrentSite(chosenSite);
				combobox.closeDropdown();
			}}
		>
			<Combobox.Target>
				<InputBase
					label={label}
					component="button"
					type="button"
					pointer
					rightSection={<Combobox.Chevron />}
					onClick={() => combobox.toggleDropdown()}
					rightSectionPointerEvents="none"
					multiline
				>
					{selectedOption ? (
						<SelectOption {...selectedOption} />
					) : (
						<Input.Placeholder>
							<Center>
								<Text h="2.5em" w="17em">
									Loading...
								</Text>
							</Center>
						</Input.Placeholder>
					)}
				</InputBase>
			</Combobox.Target>

			<Combobox.Dropdown>
				<Combobox.Options>{options}</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	);
}
