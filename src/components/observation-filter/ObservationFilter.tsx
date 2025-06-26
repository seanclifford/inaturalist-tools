import { Modal, Stack } from "@mantine/core";
import QueryStringInput from "../../pages/annotator/QueryStringInput";

interface ObservationFilterProps {
	opened: boolean;
	close: () => void;
	pageQueryString: string;
	runQuery: (_: string) => void;
}

export default function ObservationFilter({
	opened,
	close,
	pageQueryString,
	runQuery,
}: ObservationFilterProps) {
	return (
		<Modal
			opened={opened}
			onClose={close}
			title="Observation Filter"
			centered
			size="lg"
		>
			<Stack gap="xs">
				<QueryStringInput
					pageQueryString={pageQueryString}
					runQuery={runQuery}
				/>
			</Stack>
		</Modal>
	);
}
