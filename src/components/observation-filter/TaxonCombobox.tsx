import { useContext, useState } from "react";
import { SearchCombobox } from "./SearchCombobox";
import { useTaxaAutocomplete } from "../../hooks/useTaxaAutocomplete";
import { SiteContext } from "../../Contexts";

export function TaxonCombobox() {
	const [site] = useContext(SiteContext);
	const [value, setValue] = useState<string | null>(null);
	const [search, setSearch] = useState("");
	const taxa = useTaxaAutocomplete(search, site);

	const filteredOptions = taxa.map((t) => t.name);

	return (
		<SearchCombobox
			value={value}
			setValue={setValue}
			autocompleteValues={filteredOptions}
			requestAutocomplete={setSearch}
			placeholder="Select a taxon"
		/>
	);
}
