import { useQuery } from "@tanstack/react-query";
import { getTaxon } from "../inaturalist/api";
import useSite from "./useSite";
import { getSiteUrlParams } from "../inaturalist/params";
import { oneDay } from "../constants/values";

export function useTaxon(id: number | null) {
	const [site] = useSite();

	return useQuery({
		queryKey: ["taxon", id],
		queryFn: () => getTaxon(id, getSiteUrlParams(site)),
		staleTime: oneDay,
	});
}
