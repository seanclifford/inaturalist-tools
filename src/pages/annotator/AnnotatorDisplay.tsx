import { useDisclosure } from "@mantine/hooks";
import { SettingsIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AuthenticationModal from "../../components/authentication-modal/AuthenticationModal";
import ObservationFilterModal from "../../components/observation-filter/ObservationFilterModal";
import AnnotatorGallery, { type SlidesRef } from "./AnnotatorGallery";

interface AnnotatorDisplayProps {
	pageQueryString: string;
	setPageQueryString: (queryString: string) => void;
}

export default function AnnotatorDisplay({
	pageQueryString,
	setPageQueryString,
}: AnnotatorDisplayProps) {
	const slidesRef = useRef<SlidesRef>(null);
	const [submittedQueryString, setSubmittedQueryString] =
		useState(pageQueryString);
	const [settingsOpened, { open: openSettings, close: closeSettings }] =
		useDisclosure(false);
	const [
		authenticationOpened,
		{ open: openAuthentication, close: closeAuthentication },
	] = useDisclosure(false);
	const runQuery = (queryString: string) => {
		setPageQueryString(queryString);
		slidesRef.current?.resetToBeginning();
		closeSettings();
	};
	useEffect(() => setSubmittedQueryString(pageQueryString), [pageQueryString]);

	return (
		<>
			<ObservationFilterModal
				opened={settingsOpened}
				close={closeSettings}
				pageQueryString={pageQueryString}
				runQuery={runQuery}
			/>
			<AuthenticationModal
				opened={authenticationOpened}
				close={closeAuthentication}
			/>
			<SettingsIcon
				fill="white"
				size={34}
				onClick={openSettings}
				strokeWidth={1.1}
				style={{
					position: "fixed",
					right: "12px",
					top: "12px",
					zIndex: "100",
				}}
			/>
			<AnnotatorGallery
				ref={slidesRef}
				submittedQueryString={submittedQueryString}
				openAuthentication={openAuthentication}
			/>
		</>
	);
}
