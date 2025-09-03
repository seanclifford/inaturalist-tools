import { Stack } from "@mantine/core";
import QueryStringInput from "../../pages/annotator/QueryStringInput";
import { TaxonCombobox } from "./TaxonCombobox";
import { useState } from "react";

interface ObservationFilterProps {
	pageQueryString: string;
	runQuery: (_: string) => void;
}

export default function ObservationFilter({
	pageQueryString,
	runQuery,
}: ObservationFilterProps) {
	const [queryString, setQueryString] = useState(pageQueryString);

	const taxonId = getQueryStringParam(queryString, "taxon_id");

	const onTaxonChange = (taxon: Taxon | null) => {
		setQueryString(
			setQueryStringParam(queryString, "taxon_id", taxon?.id.toString()),
		);
	};

	return (
		<Stack gap="xs">
			<QueryStringInput pageQueryString={queryString} runQuery={runQuery} />
			<TaxonCombobox onSelect={onTaxonChange} valueId={Number(taxonId)} />
		</Stack>
	);
}

function getQueryStringParam(queryString: string, paramName: string) {
	const searchParams = new URLSearchParams(queryString);
	return searchParams.get(paramName);
}

function setQueryStringParam(
	queryString: string,
	paramName: string,
	paramValue: string | undefined,
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
