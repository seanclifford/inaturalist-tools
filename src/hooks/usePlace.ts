import { useQuery } from "@tanstack/react-query";
import { getPlace } from "../inaturalist/api";
import useSite from "./useSite";
import { getSiteUrlParams } from "../inaturalist/params";
import { oneDay } from "../constants/values";

export function usePlace(id: number | null) {
	const [site] = useSite();

	return useQuery({
		queryKey: ["place", id],
		queryFn: () => getPlace(id, getSiteUrlParams(site)),
		staleTime: oneDay,
	});
}
