import { Button, Stack } from "@mantine/core";
import { useCallback, useState } from "react";
import QueryStringInput from "../../pages/annotator/QueryStringInput";
import { PlaceCombobox } from "./PlaceCombobox";
import { TaxonCombobox } from "./TaxonCombobox";
import { WithoutAnnotationSelect } from "./WithoutAnnotationSelect";

interface ObservationFilterProps {
	pageQueryString: string;
	runQuery: (_: string) => void;
}

const paramTaxonId = "taxon_id";
const paramPlaceId = "place_id";
const paramWithoutTermId = "without_term_id";

export default function ObservationFilter({
	pageQueryString,
	runQuery,
}: ObservationFilterProps) {
	const [queryString, setQueryString] = useState(pageQueryString);

	const searchParams = new URLSearchParams(queryString);
	const taxonId = Number(searchParams.get(paramTaxonId));
	const placeId = Number(searchParams.get(paramPlaceId));
	const withoutTermId = searchParams.get(paramWithoutTermId);

	/* TODO: use remaining search params to populate a list of removable pills
	searchParams.delete(paramTaxonId);
	searchParams.delete(paramPlaceId);
	searchParams.delete(paramWithoutTermId);
	*/

	const onTaxonChange = useCallback(
		(taxon: Taxon | null) => {
			setQueryString(
				setQueryStringParam(queryString, paramTaxonId, taxon?.id.toString()),
			);
		},
		[queryString],
	);

	const onPlaceChange = (place: Place | null) => {
		setQueryString(
			setQueryStringParam(queryString, paramPlaceId, place?.id.toString()),
		);
	};

	const onWithoutTermChange = (termId: string | null) => {
		setQueryString(
			setQueryStringParam(queryString, paramWithoutTermId, termId),
		);
	};

	return (
		<Stack gap="xs" maw="800px">
			<QueryStringInput pageQueryString={queryString} runQuery={runQuery} />
			<TaxonCombobox onSelect={onTaxonChange} valueId={taxonId} />
			<PlaceCombobox onSelect={onPlaceChange} valueId={placeId} />
			<WithoutAnnotationSelect
				onSelect={onWithoutTermChange}
				valueId={withoutTermId}
			/>
			<Button onClick={() => runQuery(queryString)}>Go</Button>
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
