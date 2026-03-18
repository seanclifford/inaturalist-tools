import { Center, Stack, Title } from "@mantine/core";
import ObservationFilter from "../../components/observation-filter/ObservationFilter";
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
					<Stack p="sm">
						<Title size="xl">Enter filters to load observations</Title>
						<ObservationFilter
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
