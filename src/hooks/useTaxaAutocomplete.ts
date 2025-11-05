import { type QueryClient, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getTaxaAutocomplete } from "../inaturalist/api";

export function useTaxaAutocomplete(search: string, site: Site): Taxon[] {
	const [results, setResults] = useState<Taxon[]>([]);
	const queryClient = useQueryClient();

	useEffect(() => {
		if (search.length <= 2 || !site) setResults([]);
		else
			getTaxaAutocomplete(generateQueryString(search, site))
				.then((taxa) => onLoadTaxa(taxa, setResults, queryClient))
				.catch(console.error);
	}, [search, site, queryClient]);

	return results;
}

function generateQueryString(search: string, site: Site): URLSearchParams {
	const searchParams = new URLSearchParams();
	searchParams.append("q", search);
	searchParams.append("is_active", "true");
	searchParams.append("per_page", "10");
	searchParams.append("locale", site.locale ?? navigator.language);
	if (site.place_id)
		searchParams.append("preferred_place_id", site.place_id.toString());
	return searchParams;
}

function onLoadTaxa(
	taxa: Taxon[],
	setResults: (taxa: Taxon[]) => void,
	queryClient: QueryClient,
) {
	setResults(taxa);
	for (const taxon of taxa)
		queryClient.setQueryData(["taxon", taxon.id], taxon);
}
