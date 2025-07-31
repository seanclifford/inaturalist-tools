import { usePageQueryString } from "../../hooks/usePageQueryString";
import ObservationFilter from "../../components/observation-filter/ObservationFilter";
import AnnotatorDisplay from "./AnnotatorDisplay";

interface AnnotatorProps {
	site: Site;
	authentication: Authentication;
}

function Annotator({ site, authentication }: AnnotatorProps) {
	const [pageQueryString, setPageQueryString] = usePageQueryString();

	return (
		<main>
			{pageQueryString ? (
				<AnnotatorDisplay
					site={site}
					authentication={authentication}
					pageQueryString={pageQueryString}
					setPageQueryString={setPageQueryString}
				/>
			) : (
				<ObservationFilter
					site={site}
					pageQueryString={pageQueryString}
					runQuery={setPageQueryString}
				/>
			)}
		</main>
	);
}

export default Annotator;
