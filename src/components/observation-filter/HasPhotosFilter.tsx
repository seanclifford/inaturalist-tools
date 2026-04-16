import { Checkbox } from "@mantine/core";
import { observationParams } from "../../inaturalist/constants";
import type { paramChange } from "./ObservationFilter";

interface HasPhotosFilterProps {
	searchParams: URLSearchParams;
	onParamChange: (changes: paramChange) => void;
}

export default function HasPhotosFilter({
	searchParams,
	onParamChange,
}: HasPhotosFilterProps) {
	const hasPhotos = searchParams.get(observationParams.photos) === "true";

	const onHasPhotosChange = (hasPhotos: boolean) => {
		onParamChange([[observationParams.photos, hasPhotos ? "true" : null]]);
	};

	return (
		<Checkbox
			checked={hasPhotos}
			label="Has Photos"
			onChange={(e) => onHasPhotosChange(e.target.checked)}
		/>
	);
}
