import { Group, Pill } from "@mantine/core";
import { observationParamsWithoutFields } from "../../inaturalist/constants";

interface OtherFiltersParams {
	searchParams: URLSearchParams;
	onParamChange: (paramName: string, value: string | null | undefined) => void;
}

export function OtherFilters({
	searchParams,
	onParamChange,
}: OtherFiltersParams) {
	const otherParams = [...getOtherParams(searchParams)];
	const onRemove = (key: string) => onParamChange(key, null);
	return (
		<Group>
			{otherParams.map((param) => {
				const pillValue = `${param[0]}=${param[1]}`;
				return (
					<Pill
						key={pillValue}
						withRemoveButton
						onRemove={() => onRemove(param[0])}
					>
						{pillValue}
					</Pill>
				);
			})}
		</Group>
	);
}

function* getOtherParams(searchParams: URLSearchParams) {
	for (const param of searchParams.entries()) {
		if (!observationParamsWithoutFields.includes(param[0])) yield param;
	}
}
