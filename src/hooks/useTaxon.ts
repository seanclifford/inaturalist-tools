import { useQuery } from "@tanstack/react-query";
import { oneDay } from "../constants/values";
import { getTaxon } from "../inaturalist/api";
import { getSiteUrlParams } from "../inaturalist/params";
import useSite from "./useSite";

export function useTaxon(id: number | null) {
	const [site] = useSite();

	return useQuery({
		queryKey: ["taxon", id],
		queryFn: () => getTaxon(id, getSiteUrlParams(site)),
		staleTime: oneDay,
	});
}
