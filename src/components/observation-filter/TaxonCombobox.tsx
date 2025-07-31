import { useState } from "react";
import { SearchCombobox } from "./SearchCombobox";
import { useTaxaAutocomplete } from "../../hooks/useTaxaAutocomplete";

interface TaxonComboboxProps {
	site: Site;
}

export function TaxonCombobox({ site }: TaxonComboboxProps) {
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
