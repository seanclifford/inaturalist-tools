import { useEffect, useState } from "react";
import AnnotatorGallery from "./AnnotatorGallery";
import { useAnnotatorObservations } from "./useAnnotatorObservations";
import { useDisclosure } from "@mantine/hooks";
import { SettingsIcon } from "lucide-react";
import ObservationFilterModal from "../../components/observation-filter/ObservationFilterModal";

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
	const { annotatorObservations, status, error, annotationFunctions } =
		useAnnotatorObservations(submitedQueryString);
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
				/>
			) : null}
		</>
	);
}
