import { useQuery } from "@tanstack/react-query";
import SitesList from "./SiteList";
import { getSites } from "../../inaturalist/api";
import { oneDay } from "../../constants/values";

function SiteSelectionPage() {
	const {
		isPending,
		isError,
		isFetched,
		data: sites,
		error,
	} = useQuery({ queryKey: ["sites"], queryFn: getSites, staleTime: oneDay });

	return (
		<main>
			<h1>Select a site</h1>
			{isPending ? "Loading..." : null}
			{isError ? `ERROR: ${error.name} ${error.message}` : null}
			{isFetched && sites ? (
				<SitesList sites={sites} />
			) : null}
		</main>
	);
}

export default SiteSelectionPage;
