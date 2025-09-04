import { useEffect, useState } from "react";
import { getPlacesAutocomplete } from "../inaturalist/api";

export function usePlacesAutocomplete(search: string, site: Site): Place[] {
	const [results, setResults] = useState<Place[]>([]);

	useEffect(() => {
		if (search.length <= 2 || !site) setResults([]);
		else
			getPlacesAutocomplete(generateQueryString(search, site))
				.then((places) => setResults(places))
				.catch(console.error);
	}, [search, site]);

	return results;
}

function generateQueryString(search: string, site: Site): URLSearchParams {
	const searchParams = new URLSearchParams();
	searchParams.append("q", search);
	searchParams.append("per_page", "10");
	searchParams.append("locale", site.locale ?? navigator.language);
	return searchParams;
}
