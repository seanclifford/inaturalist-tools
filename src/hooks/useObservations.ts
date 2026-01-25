import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { AuthContext, SiteContext } from "../Contexts";
import { getObservations } from "../inaturalist/api";

interface ObservationsSuccessResult {
	data: Observation[];
	status: "success";
	error: null;
	loadMore: () => void;
	replaceObservation: (observation: Observation) => void;
}
interface ObservationsPendingResult {
	data: undefined;
	status: "pending";
	error: null;
	loadMore: null;
	replaceObservation: null;
}
interface ObservationsErrorResult {
	data: undefined;
	status: "error";
	error: Error | null;
	loadMore: null;
	replaceObservation: null;
}
interface ObservationsRefetchErrorResult {
	data: Observation[];
	status: "error";
	error: Error | null;
	loadMore: null;
	replaceObservation: null;
}
type ObservationsResult =
	| ObservationsSuccessResult
	| ObservationsPendingResult
	| ObservationsErrorResult
	| ObservationsRefetchErrorResult;

export function useObservations(
	submitedQueryString: string,
): ObservationsResult {
	const [site] = useContext(SiteContext);
	const authentication = useContext(AuthContext);
	const [observationMap, setObservationMap] = useState<Map<
		number,
		Observation
	> | null>(null);
	const [error, setError] = useState<Error | null>(null);
	const pageNumber = useRef<number>(1);
	const loadingMore = useRef(false);

	const observations = useMemo(() => {
		if (!observationMap || error) return;
		return Array.from(observationMap, ([_, value]) => value);
	}, [observationMap, error]);

	useEffect(() => {
		pageNumber.current = 1;
		getObservations(
			generateQueryString(submitedQueryString, site, 1),
			authentication,
		)
			.then((data) => {
				const map = new Map();
				for (const obs of data.results) map.set(obs.id, obs);
				setObservationMap(map);
				setError(null);
			})
			.catch((err) => {
				setObservationMap(null);
				setError(err);
			});
	}, [submitedQueryString, site, authentication]);

	const loadMore = () => {
		if (!observationMap) return;

		const execute = async () => {
			if (loadingMore.current) return;

			loadingMore.current = true;
			try {
				const newMap = new Map(observationMap);
				const originalSize = newMap.size;
				let pageLoaded = pageNumber.current;
				let totalPages = await loadObservations(
					submitedQueryString,
					site,
					authentication,
					pageLoaded,
					newMap,
				);

				if (newMap.size === originalSize) pageNumber.current += 1;
				while (pageLoaded < totalPages && newMap.size < originalSize + 10) {
					pageLoaded += 1;
					totalPages = await loadObservations(
						submitedQueryString,
						site,
						authentication,
						pageLoaded,
						newMap,
					);
				}
				setObservationMap(newMap);
			} catch (e) {
				setError(e as Error);
			} finally {
				loadingMore.current = false;
			}
		};
		execute();
	};

	const replaceObservation = (observation: Observation) => {
		if (!observationMap) return;
		const newMap = new Map(observationMap);
		newMap.set(observation.id, observation);
		setObservationMap(newMap);
	};

	if (error) {
		return {
			data: undefined,
			status: "error",
			error: error,
			loadMore: null,
			replaceObservation: null,
		};
	}
	if (observations) {
		return {
			data: observations,
			status: "success",
			error: null,
			loadMore,
			replaceObservation,
		};
	}
	return {
		data: undefined,
		status: "pending",
		error: null,
		loadMore: null,
		replaceObservation: null,
	};
}

async function loadObservations(
	submitedQueryString: string,
	site: Site,
	authentication: Authentication,
	pageNumber: number,
	resultMap: Map<number, Observation>,
) {
	const results = await getObservations(
		generateQueryString(submitedQueryString, site, pageNumber),
		authentication,
	);
	for (const obs of results.results) resultMap.set(obs.id, obs);
	return results.pages;
}

function generateQueryString(
	query: string,
	site: Site,
	pageNumber: number,
): URLSearchParams {
	const searchParams = new URLSearchParams(query);
	searchParams.append("locale", site.locale ?? navigator.language);
	if (site.place_id)
		searchParams.append("preferred_place_id", site.place_id.toString());
	if (pageNumber > 1) searchParams.append("page", pageNumber.toString());
	return searchParams;
}
