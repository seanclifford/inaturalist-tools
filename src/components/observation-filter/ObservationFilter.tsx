import { Stack } from "@mantine/core";
import QueryStringInput from "../../pages/annotator/QueryStringInput";
import { TaxonCombobox } from "./TaxonCombobox";

interface ObservationFilterProps {
	site: Site;
	pageQueryString: string;
	runQuery: (_: string) => void;
}

export default function ObservationFilter({
	site,
	pageQueryString,
	runQuery,
}: ObservationFilterProps) {
	return (
		<Stack gap="xs">
			<QueryStringInput pageQueryString={pageQueryString} runQuery={runQuery} />
			<TaxonCombobox site={site} />
		</Stack>
	);
}
