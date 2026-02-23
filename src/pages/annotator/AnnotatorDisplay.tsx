import { useDisclosure } from "@mantine/hooks";
import { SettingsIcon } from "lucide-react";
import { useEffect, useState } from "react";
import AuthenticationModal from "../../components/authentication-modal/AuthenticationModal";
import ObservationFilterModal from "../../components/observation-filter/ObservationFilterModal";
import AnnotatorGallery from "./AnnotatorGallery";

interface AnnotatorDisplayProps {
	pageQueryString: string;
	setPageQueryString: (queryString: string) => void;
}

export default function AnnotatorDisplay({
	pageQueryString,
	setPageQueryString,
}: AnnotatorDisplayProps) {
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
				size={40}
				onClick={openSettings}
				style={{
					position: "fixed",
					right: "16px",
					top: "16px",
					zIndex: "100",
				}}
			/>
			<AnnotatorGallery
				submittedQueryString={submittedQueryString}
				openAuthentication={openAuthentication}
			/>
		</>
	);
}
