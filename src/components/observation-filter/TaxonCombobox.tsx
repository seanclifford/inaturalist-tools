import { useCallback, useContext, useState } from "react";
import { SearchCombobox } from "./SearchCombobox";
import { useTaxaAutocomplete } from "../../hooks/useTaxaAutocomplete";
import { Stack, Image, Group, Text } from "@mantine/core";
import { SiteContext } from "../../Contexts";
import { useTaxon } from "../../hooks/useTaxon";
import { Search } from "lucide-react";

interface TaxonComboboxProps {
	valueId: number | null;
	onSelect: (taxon: Taxon | null) => void;
}

interface TaxonNames {
	primaryName: string;
	secondaryName: string;
}

export function TaxonCombobox({ valueId, onSelect }: TaxonComboboxProps) {
	const [site] = useContext(SiteContext);
	const [search, setSearch] = useState("");
	const taxa = useTaxaAutocomplete(search, site);
	const { data: value } = useTaxon(valueId);

	const comboSetValue = useCallback(
		(taxon: Taxon | null) => {
			if (taxon?.id === value?.id) return;

			onSelect(taxon);
		},
		[value, onSelect],
	);

	const buildOptionInternal = useCallback(buildOption, []);
	const getValue = useCallback(
		(x: Taxon | null) => getTaxonNames(x)?.primaryName ?? "",
		[],
	);
	const getKey = useCallback((x: Taxon | null) => x?.id ?? 0, []);

	return (
		<>
			<SearchCombobox
				value={value ?? null}
				setValue={comboSetValue}
				autocompleteValues={taxa}
				requestAutocomplete={setSearch}
				label="Taxon"
				placeholder="Search for a taxon"
				getKey={getKey}
				getValue={getValue}
				buildOption={buildOptionInternal}
				leftSection={
					value?.default_photo?.square_url ? (
						<Image src={value.default_photo.square_url} h={"24px"} w={"24px"} />
					) : (
						<Search />
					)
				}
			/>
		</>
	);
}

function buildOption(taxon: Taxon) {
	const { primaryName, secondaryName } = getTaxonNames(taxon);
	const rank = taxon.rank_level > 10 ? taxon.rank : "";

	return (
		<Group>
			{taxon.default_photo?.square_url ? (
				<Image src={taxon.default_photo?.square_url} h={"40px"} w={"40px"} />
			) : null}
			<Stack gap="xs">
				{primaryName}
				<Group gap="xs">
					{rank}
					{secondaryName ? (
						<Text size="xs" fs={taxon.rank_level <= 10 ? "italic" : ""}>
							{secondaryName}
						</Text>
					) : null}
				</Group>
			</Stack>
		</Group>
	);
}

function getTaxonNames(taxon: Taxon | null): TaxonNames {
	let primaryName: string;
	let secondaryName: string;
	if (taxon?.preferred_common_name) {
		primaryName = taxon.preferred_common_name;
		secondaryName = taxon.name;
	} else {
		primaryName = taxon?.name ?? "";
		secondaryName = "";
	}

	return { primaryName, secondaryName };
}
