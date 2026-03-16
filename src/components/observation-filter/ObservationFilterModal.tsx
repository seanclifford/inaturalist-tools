import { Modal } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import ObservationFilter from "./ObservationFilter";
import classes from "./ObservationFilterModal.module.css";

interface ObservationFilterModalProps {
	opened: boolean;
	close: () => void;
	pageQueryString: string;
	runQuery: (_: string) => void;
}

export default function ObservationFilterModal({
	opened,
	close,
	pageQueryString,
	runQuery,
}: ObservationFilterModalProps) {
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
			classNames={{ body: classes.body }}
		>
			<ObservationFilter
				pageQueryString={pageQueryString}
				runQuery={runQuery}
			/>
		</Modal>
	);
}
