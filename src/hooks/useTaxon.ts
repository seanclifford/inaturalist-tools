import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { SiteContext } from "../Contexts";
import { oneDay } from "../constants/values";
import { getTaxon } from "../inaturalist/api";
import { getSiteUrlParams } from "../inaturalist/params";

export function useTaxon(id: number | null) {
	const [site] = useContext(SiteContext);

	return useQuery({
		queryKey: ["taxon", id],
		queryFn: () => getTaxon(id, getSiteUrlParams(site)),
		staleTime: oneDay,
	});
}
