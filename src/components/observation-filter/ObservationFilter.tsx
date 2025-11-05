import { Button, Stack, Tabs } from "@mantine/core";
import { useState } from "react";
import QueryStringInput from "../../pages/annotator/QueryStringInput";
import AuthenticationDetails from "../authentication-details/AuthenticationDetails";
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

	const taxonId = getQueryStringParam(queryString, "taxon_id");
	const placeId = getQueryStringParam(queryString, "place_id");
	const withoutTermId = getQueryStringParam(queryString, "without_term_id");

	const onTaxonChange = (taxon: Taxon | null) => {
		setQueryString(
			setQueryStringParam(queryString, "taxon_id", taxon?.id.toString()),
		);
	};

	const onPlaceChange = (place: Place | null) => {
		setQueryString(
			setQueryStringParam(queryString, "place_id", place?.id.toString()),
		);
	};

	const onWithoutTermChange = (termId: string | null) => {
		setQueryString(setQueryStringParam(queryString, "without_term_id", termId));
	};

	return (
		<Tabs variant="outline" orientation="vertical" defaultValue="filters">
			<Tabs.List>
				<Tabs.Tab value="filters">Filters</Tabs.Tab>
				<Tabs.Tab value="account">Account</Tabs.Tab>
			</Tabs.List>

			<Tabs.Panel value="filters" p="md">
				<Stack gap="xs" maw="800px">
					<QueryStringInput pageQueryString={queryString} runQuery={runQuery} />
					<TaxonCombobox onSelect={onTaxonChange} valueId={Number(taxonId)} />
					<PlaceCombobox onSelect={onPlaceChange} valueId={Number(placeId)} />
					<WithoutAnnotationSelect
						onSelect={onWithoutTermChange}
						valueId={withoutTermId}
					/>
					<Button onClick={() => runQuery(queryString)}>Go</Button>
				</Stack>
			</Tabs.Panel>

			<Tabs.Panel value="account" p="md">
				<AuthenticationDetails />
			</Tabs.Panel>
		</Tabs>
	);
}

function getQueryStringParam(queryString: string, paramName: string) {
	const searchParams = new URLSearchParams(queryString);
	return searchParams.get(paramName);
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
