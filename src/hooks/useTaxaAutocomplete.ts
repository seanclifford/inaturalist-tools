import { useEffect, useState } from "react";
import { getTaxaAutocomplete } from "../inaturalist/api";

export function useTaxaAutocomplete(search: string, site: Site): Taxon[] {
	const [results, setResults] = useState<Taxon[]>([]);

	useEffect(() => {
		if (search.length <= 2 || !site) setResults([]);
		else
			getTaxaAutocomplete(generateQueryString(search, site))
				.then((taxa) => setResults(taxa))
				.catch(console.error);
	}, [search, site]);

	return results;
}

function generateQueryString(search: string, site: Site): URLSearchParams {
	const searchParams = new URLSearchParams();
	searchParams.append("q", search);
	searchParams.append("is_active", "true");
	searchParams.append("per_page", "6");
	searchParams.append("locale", site.locale ?? navigator.language);
	if (site.place_id)
		searchParams.append("preferred_place_id", site.place_id.toString());
	return searchParams;
}
