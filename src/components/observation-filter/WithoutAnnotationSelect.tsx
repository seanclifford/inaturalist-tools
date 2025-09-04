import { Select } from "@mantine/core";
import { useControlledTerms } from "../../hooks/useControlledTerms";

interface TermComboboxProps {
	valueId: string | null;
	onSelect: (newValue: string | null) => void;
}
export function WithoutAnnotationSelect({
	valueId,
	onSelect,
}: TermComboboxProps) {
	const { status, error, data } = useControlledTerms();

	const listItems = data?.map((x) => {
		return { value: x.id.toString(), label: x.label };
	});

	return (
		<>
			{status === "error" ? (
				<div key="loading">
					Error: {error?.name ?? "unknown"} {error?.message}
				</div>
			) : (
				<Select
					label="Without Annotation"
					value={valueId}
					onChange={onSelect}
					data={
						status === "pending"
							? [{ value: "0", label: "Loading...", disabled: true }]
							: (listItems ?? [])
					}
				/>
			)}
		</>
	);
}
