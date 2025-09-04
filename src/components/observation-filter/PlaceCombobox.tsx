import { useContext, useEffect, useState } from "react";
import { SearchCombobox } from "./SearchCombobox";
import { getPlace } from "../../inaturalist/api";
import { SiteContext } from "../../Contexts";
import { usePlacesAutocomplete } from "../../hooks/usePlacesAutocomplete";

interface PlaceComboboxProps {
	valueId: number | null;
	onSelect: (taxon: Place | null) => void;
}

export function PlaceCombobox({ valueId, onSelect }: PlaceComboboxProps) {
	const [site] = useContext(SiteContext);
	const [value, setValue] = useState<Place | null>(null);
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(true);
	const places = usePlacesAutocomplete(search, site);

	useEffect(() => {
		if (valueId !== value?.id) {
			if (valueId == null) {
				setValue(null);
				setLoading(false);
			} else {
				setLoading(true);
				getPlace(valueId).then((result) => {
					setValue(result);
					setLoading(false);
				});
			}
		} else setLoading(false);
	}, [valueId, value]);

	const comboSetValue = (place: Place | null) => {
		if (place?.id === value?.id) return;

		onSelect(place);
	};

	return (
		<>
			{loading ? null : (
				<SearchCombobox
					value={value}
					setValue={comboSetValue}
					autocompleteValues={places}
					requestAutocomplete={setSearch}
					placeholder="Select a place"
					getKey={(x) => x?.id ?? 0}
					getValue={(x) => getPlaceName(x)}
					buildOption={buildOption}
				/>
			)}
		</>
	);
}

function buildOption(place: Place) {
	const placeName = getPlaceName(place);

	return placeName;
}

function getPlaceName(place: Place | null): string {
	return place?.display_name || "";
}
