import { Modal } from "@mantine/core";
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
	return (
		<Modal
			opened={opened}
			onClose={close}
			title="Settings"
			centered
			size="lg"
			classNames={{ body: classes.body }}
		>
			<ObservationFilter
				pageQueryString={pageQueryString}
				runQuery={runQuery}
			/>
		</Modal>
	);
}
