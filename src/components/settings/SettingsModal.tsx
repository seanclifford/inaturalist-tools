import { Modal } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Settings from "./Settings";

interface SettingsModalProps {
	opened: boolean;
	close: () => void;
	pageQueryString: string;
	runQuery: (_: string) => void;
}

export default function SettingsModal({
	opened,
	close,
	pageQueryString,
	runQuery,
}: SettingsModalProps) {
	const isMobile = useMediaQuery("(max-width: 50em)");

	return (
		<Modal
			opened={opened}
			onClose={close}
			title="Settings"
			centered={!isMobile}
			fullScreen={isMobile}
			size="lg"
			padding="xs"
		>
			<Settings pageQueryString={pageQueryString} runQuery={runQuery} />
		</Modal>
	);
}
