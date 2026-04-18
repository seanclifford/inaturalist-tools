import { Button, Stack } from "@mantine/core";
import { useCallback, useState } from "react";
import { observationParams } from "../../inaturalist/constants";
import { PlaceCombobox } from "../search-combobox/PlaceCombobox";
import { TaxonCombobox } from "../search-combobox/TaxonCombobox";
import { UserCombobox } from "../search-combobox/UserCombobox";
import HasPhotosFilter from "./HasPhotosFilter";
import { OtherFilters } from "./OtherFilters";
import ReviewedFilter from "./ReviewedFilter";
import { WithoutAnnotationSelect } from "./WithoutAnnotationSelect";

interface ObservationFilterProps {
	pageQueryString: string;
	runQuery: (_: string) => void;
}

export type paramChange = [[string, string | null | undefined]];

export default function ObservationFilter({
	pageQueryString,
	runQuery,
}: ObservationFilterProps) {
	const [queryString, setQueryString] = useState(pageQueryString);

	const searchParams = new URLSearchParams(queryString);
	const taxonId = searchParams.get(observationParams.taxon_id);
	const placeId = searchParams.get(observationParams.place_id);
	const userId = searchParams.get(observationParams.user_id);
	const withoutTermId = searchParams.get(observationParams.without_term_id);

	const onParamChange = useCallback(
		(paramChanges: paramChange) => {
			let updatedQueryString = queryString;
			paramChanges.forEach(([paramName, paramValue]) => {
				updatedQueryString = setQueryStringParam(
					updatedQueryString,
					paramName,
					paramValue,
				);
			});

			setQueryString(updatedQueryString);
		},
		[queryString],
	);

	const onTaxonChange = useCallback(
		(taxon: Taxon | null) => {
			onParamChange([[observationParams.taxon_id, taxon?.id.toString()]]);
		},
		[onParamChange],
	);

	const onPlaceChange = (place: Place | null) => {
		onParamChange([[observationParams.place_id, place?.id.toString()]]);
	};

	const onUserChange = (user: User | null) => {
		onParamChange([[observationParams.user_id, user?.id.toString()]]);
	};

	const onWithoutTermChange = (termId: string | null) => {
		onParamChange([[observationParams.without_term_id, termId]]);
	};

	return (
		<Stack gap="xs" maw="800px">
			<TaxonCombobox onSelect={onTaxonChange} taxonId={taxonId} />
			<PlaceCombobox onSelect={onPlaceChange} placeId={placeId} />
			<UserCombobox onSelect={onUserChange} userId={userId} />
			<WithoutAnnotationSelect
				onSelect={onWithoutTermChange}
				valueId={withoutTermId}
			/>
			<HasPhotosFilter
				searchParams={searchParams}
				onParamChange={onParamChange}
			/>
			<ReviewedFilter
				searchParams={searchParams}
				onParamChange={onParamChange}
			/>
			<OtherFilters searchParams={searchParams} onParamChange={onParamChange} />
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
