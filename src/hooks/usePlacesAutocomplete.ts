import { type QueryClient, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getPlacesAutocomplete } from "../inaturalist/api";

export function usePlacesAutocomplete(search: string, site: Site): Place[] {
	const [results, setResults] = useState<Place[]>([]);
	const queryClient = useQueryClient();

	useEffect(() => {
		if (search.length <= 2 || !site) setResults([]);
		else
			getPlacesAutocomplete(generateQueryString(search, site))
				.then((places) => onLoadPlaces(places, setResults, queryClient))
				.catch(console.error);
	}, [search, site, queryClient]);

	return results;
}

function generateQueryString(search: string, site: Site): URLSearchParams {
	const searchParams = new URLSearchParams();
	searchParams.append("q", search);
	searchParams.append("per_page", "8");
	searchParams.append("locale", site.locale ?? navigator.language);
	return searchParams;
}

function onLoadPlaces(
	places: Place[],
	setResults: (places: Place[]) => void,
	queryClient: QueryClient,
) {
	setResults(places);
	for (const place of places)
		queryClient.setQueryData(["place", place.id], place);
}
