import { Button, Stack } from "@mantine/core";
import { useCallback, useState } from "react";
import { observationParams } from "../../inaturalist/constants";
import { OtherFilters } from "./OtherFilters";
import { PlaceCombobox } from "./PlaceCombobox";
import { TaxonCombobox } from "./TaxonCombobox";
import { WithoutAnnotationSelect } from "./WithoutAnnotationSelect";

interface ObservationFilterProps {
	pageQueryString: string;
	runQuery: (_: string) => void;
}

export default function ObservationFilter({
	pageQueryString,
	runQuery,
}: ObservationFilterProps) {
	const [queryString, setQueryString] = useState(pageQueryString);

	const searchParams = new URLSearchParams(queryString);
	const taxonId = Number(searchParams.get(observationParams.taxon_id));
	const placeId = Number(searchParams.get(observationParams.place_id));
	const withoutTermId = searchParams.get(observationParams.without_term_id);

	const onParamChange = useCallback(
		(paramName: string, value: string | null | undefined) => {
			setQueryString(setQueryStringParam(queryString, paramName, value));
		},
		[queryString],
	);

	const onTaxonChange = useCallback(
		(taxon: Taxon | null) => {
			onParamChange(observationParams.taxon_id, taxon?.id.toString());
		},
		[onParamChange],
	);

	const onPlaceChange = (place: Place | null) => {
		onParamChange(observationParams.place_id, place?.id.toString());
	};

	const onWithoutTermChange = (termId: string | null) => {
		onParamChange(observationParams.without_term_id, termId);
	};

	return (
		<Stack gap="xs" maw="800px">
			<TaxonCombobox onSelect={onTaxonChange} valueId={taxonId} />
			<PlaceCombobox onSelect={onPlaceChange} valueId={placeId} />
			<WithoutAnnotationSelect
				onSelect={onWithoutTermChange}
				valueId={withoutTermId}
			/>
			<OtherFilters onParamChange={onParamChange} searchParams={searchParams} />
			<Button onClick={() => runQuery(queryString)}>Load Observations</Button>
		</Stack>
	);
}

function setQueryStringParam(
	queryString: string,
	paramName: string,
	paramValue: string | undefined | null,
): string {
	const searchParams = new URLSearchParams(queryString);
	if (!paramValue) {
		if (searchParams.has(paramName)) searchParams.delete(paramName);
	} else {
		if (searchParams.has(paramName)) searchParams.set(paramName, paramValue);
		else searchParams.append(paramName, paramValue);
	}
	return searchParams.toString();
}
