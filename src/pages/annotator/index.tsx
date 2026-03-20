import { Center, Stack, Title } from "@mantine/core";
import Settings from "../../components/settings/Settings";
import { usePageQueryString } from "../../hooks/usePageQueryString";
import AnnotatorDisplay from "./AnnotatorDisplay";

function Annotator() {
	const [pageQueryString, setPageQueryString] = usePageQueryString();

	return (
		<main className="annotator">
			{pageQueryString ? (
				<AnnotatorDisplay
					pageQueryString={pageQueryString}
					setPageQueryString={setPageQueryString}
				/>
			) : (
				<Center>
					<Stack p="sm" w="min(100%, 800px)">
						<Title size="xl">Enter filters to load observations</Title>
						<Settings
							pageQueryString={pageQueryString}
							runQuery={setPageQueryString}
						/>
					</Stack>
				</Center>
			)}
		</main>
	);
}

export default Annotator;
