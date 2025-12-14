import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { SiteContext } from "../Contexts";
import { oneDay } from "../constants/values";
import { getPlace } from "../inaturalist/api";
import { getSiteUrlParams } from "../inaturalist/params";

export function usePlace(id: number | null) {
	const [site] = useContext(SiteContext);

	return useQuery({
		queryKey: ["place", id],
		queryFn: () => getPlace(id, getSiteUrlParams(site)),
		staleTime: oneDay,
	});
}
