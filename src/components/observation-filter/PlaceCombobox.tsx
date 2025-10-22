import { useCallback, useContext, useState } from "react";
import { SearchCombobox } from "./SearchCombobox";
import { SiteContext } from "../../Contexts";
import { usePlacesAutocomplete } from "../../hooks/usePlacesAutocomplete";
import { MapPin, Search } from "lucide-react";
import { usePlace } from "../../hooks/usePlace";

interface PlaceComboboxProps {
	valueId: number | null;
	onSelect: (taxon: Place | null) => void;
}

export function PlaceCombobox({ valueId, onSelect }: PlaceComboboxProps) {
	const [site] = useContext(SiteContext);
	const [search, setSearch] = useState("");
	const { data: value, isLoading } = usePlace(valueId);
	const places = usePlacesAutocomplete(search, site);

	const comboSetValue = useCallback(
		(place: Place | null) => {
			if (place?.id === value?.id) return;

			onSelect(place);
		},
		[value, onSelect],
	);

	const getKey = useCallback((place: Place | null) => place?.id ?? 0, []);
	const getPlaceName = useCallback(
		(place: Place | null) => place?.display_name || "",
		[],
	);
	const buildOption = useCallback(
		(place: Place) => getPlaceName(place),
		[getPlaceName],
	);

	return (
		<SearchCombobox
			value={value ?? null}
			setValue={comboSetValue}
			loading={isLoading}
			autocompleteValues={places}
			requestAutocomplete={setSearch}
			label="Place"
			placeholder="Search for a place"
			getKey={getKey}
			getValue={getPlaceName}
			buildOption={buildOption}
			leftSection={value ? <MapPin /> : <Search />}
		/>
	);
}
