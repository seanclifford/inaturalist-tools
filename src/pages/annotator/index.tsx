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
		<main className="annotator">
			{pageQueryString ? (
				<AnnotatorDisplay
					site={site}
					authentication={authentication}
					pageQueryString={pageQueryString}
					setPageQueryString={setPageQueryString}
				/>
			) : (
				<Stack p="md" gap="xs">
				<ObservationFilter
					site={site}
					pageQueryString={pageQueryString}
					runQuery={setPageQueryString}
				/>
				</Stack>
			)}
		</main>
	);
}

export default Annotator;
