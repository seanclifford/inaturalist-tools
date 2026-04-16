import {
	Button,
	Group,
	Pill,
	Stack,
	TextInput,
	useMantineTheme,
} from "@mantine/core";
import { useRef } from "react";
import { observationParamsWithFields } from "../../inaturalist/constants";
import type { paramChange } from "./ObservationFilter";

interface OtherFiltersParams {
	searchParams: URLSearchParams;
	onParamChange: (changes: paramChange) => void;
}

export function OtherFilters({
	searchParams,
	onParamChange,
}: OtherFiltersParams) {
	const theme = useMantineTheme();
	const newKeyRef = useRef<HTMLInputElement>(null);
	const newValRef = useRef<HTMLInputElement>(null);

	const otherParams = [...getOtherParams(searchParams)];

	const onAdd = () => {
		if (!newKeyRef.current || !newValRef.current) return;
		const key = newKeyRef.current.value;
		const val = newValRef.current.value;
		newKeyRef.current.value = newValRef.current.value = "";
		onParamChange([[key, val]]);
	};

	const onRemove = (key: string) => onParamChange([[key, null]]);

	return (
		<Stack>
			<Group align="end" gap="xs">
				<TextInput
					ref={newKeyRef}
					label="Other Filters"
					placeholder="Filter Key"
					flex={1}
				/>
				<TextInput ref={newValRef} placeholder="Filter Value" flex={1} />
				<Button onClick={onAdd} color={theme.colors.gray[6]}>
					Add
				</Button>
			</Group>
			<Group pb="sm">
				{otherParams.map((param) => {
					const pillValue = `${param[0]}=${param[1]}`;
					return (
						<Pill
							size="md"
							key={pillValue}
							withRemoveButton
							onRemove={() => onRemove(param[0])}
						>
							{pillValue}
						</Pill>
					);
				})}
			</Group>
		</Stack>
	);
}

function* getOtherParams(searchParams: URLSearchParams) {
	for (const param of searchParams.entries()) {
		if (!observationParamsWithFields.includes(param[0])) yield param;
	}
}
