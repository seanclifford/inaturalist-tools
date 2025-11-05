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
				<ObservationFilter
					pageQueryString={pageQueryString}
					runQuery={setPageQueryString}
				/>
			)}
		</main>
	);
}

export default Annotator;
