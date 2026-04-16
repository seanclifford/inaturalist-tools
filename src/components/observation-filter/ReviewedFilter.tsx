import { Checkbox } from "@mantine/core";
import { useContext } from "react";
import { CurrentUserContext } from "../../Contexts";
import { observationParams } from "../../inaturalist/constants";
import type { paramChange } from "./ObservationFilter";

interface ReviewedFilterProps {
	searchParams: URLSearchParams;
	onParamChange: (changes: paramChange) => void;
}

export default function ReviewedFilter({
	searchParams,
	onParamChange,
}: ReviewedFilterProps) {
	const user = useContext(CurrentUserContext);

	let includeReviewed =
		searchParams.get(observationParams.reviewed) !== "false";
	const reviewedViewer = searchParams.get(observationParams.viewer_id);
	if (!reviewedViewer) includeReviewed = true;

	const onIncludeReviewedChange = (includeReviewed: boolean) => {
		const changes = [
			[observationParams.reviewed, includeReviewed ? "true" : "false"],
		] as paramChange;
		if (user) {
			changes.push([observationParams.viewer_id, user.id.toString()]);
		}
		onParamChange(changes);
	};

	return (
		<Checkbox
			checked={includeReviewed}
			label="Reviewed?"
			onChange={(e) => onIncludeReviewedChange(e.target.checked)}
		/>
	);
}
