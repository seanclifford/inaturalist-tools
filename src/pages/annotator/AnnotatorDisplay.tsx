import { useDisclosure } from "@mantine/hooks";
import { SettingsIcon } from "lucide-react";
import { useEffect, useState } from "react";
import ObservationFilterModal from "../../components/observation-filter/ObservationFilterModal";
import AnnotatorGallery from "./AnnotatorGallery";
import { useAnnotatorObservations } from "./useAnnotatorObservations";

interface AnnotatorDisplayProps {
	pageQueryString: string;
	setPageQueryString: (queryString: string) => void;
}

export default function AnnotatorDisplay({
	pageQueryString,
	setPageQueryString,
}: AnnotatorDisplayProps) {
	const [submitedQueryString, setSubmitedQueryString] =
		useState(pageQueryString);
	const [settingsOpened, { open: openSettings, close: closeSettings }] =
		useDisclosure(false);
	const {
		annotatorObservations,
		status,
		error,
		annotationFunctions,
		loadMore,
	} = useAnnotatorObservations(submitedQueryString);
	const runQuery = (queryString: string) => {
		setPageQueryString(queryString);
		closeSettings();
	};
	useEffect(() => setSubmitedQueryString(pageQueryString), [pageQueryString]);

	return (
		<>
			<ObservationFilterModal
				opened={settingsOpened}
				close={closeSettings}
				pageQueryString={pageQueryString}
				runQuery={runQuery}
			/>
			<SettingsIcon
				fill="white"
				size={40}
				onClick={openSettings}
				style={{
					position: "fixed",
					right: "16px",
					top: "16px",
					zIndex: "1",
				}}
			/>
			{status === "pending" ? <div key="loading">Loading...</div> : null}
			{status === "error" ? (
				<div key="loading">
					Error: {error?.name ?? "unknown"} {error?.message}
				</div>
			) : null}
			{status === "success" && annotatorObservations ? (
				<AnnotatorGallery
					annotatorObservations={annotatorObservations}
					annotationFunctions={annotationFunctions}
					loadMore={loadMore ?? (() => {})}
				/>
			) : null}
		</>
	);
}
