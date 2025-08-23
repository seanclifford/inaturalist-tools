import { usePageQueryString } from "../../hooks/usePageQueryString";
import ObservationFilter from "../../components/observation-filter/ObservationFilter";
import AnnotatorDisplay from "./AnnotatorDisplay";
import { Stack } from "@mantine/core";
import AuthenticationDetails from "../../components/authentication-details/AuthenticationDetails";

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
				<Stack p="md" gap="xs">
					<AuthenticationDetails />
					<ObservationFilter
						pageQueryString={pageQueryString}
						runQuery={setPageQueryString}
					/>
				</Stack>
			)}
		</main>
	);
}

export default Annotator;
