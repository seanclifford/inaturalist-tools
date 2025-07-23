import { Modal } from "@mantine/core";
import ObservationFilter from "./ObservationFilter";

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
			title="Observation Filter"
			centered
			size="lg"
		>
			<ObservationFilter
				pageQueryString={pageQueryString}
				runQuery={runQuery}
			/>
		</Modal>
	);
}
