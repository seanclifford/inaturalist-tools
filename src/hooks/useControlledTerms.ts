import { useQuery } from "@tanstack/react-query";
import { oneDay } from "../constants/values";
import { getControlledTerms } from "../inaturalist/api";

export function useControlledTerms() {
	return useQuery({
		queryKey: ["controlled-terms"],
		queryFn: getControlledTerms,
		staleTime: oneDay,
	});
}
