import { useQuery } from "@tanstack/react-query";
import { oneDay } from "../constants/values";
import { getPlace } from "../inaturalist/api";
import { getSiteUrlParams } from "../inaturalist/params";
import useSite from "./useSite";

export function usePlace(id: number | null) {
	const [site] = useSite();

	return useQuery({
		queryKey: ["place", id],
		queryFn: () => getPlace(id, getSiteUrlParams(site)),
		staleTime: oneDay,
	});
}
