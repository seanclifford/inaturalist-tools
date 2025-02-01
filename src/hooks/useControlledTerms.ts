import { useQuery } from "@tanstack/react-query";
import { getControlledTerms } from "../inaturalist/api";
import { oneDay } from "../constants/values";

export function useControlledTerms() {
    return useQuery({queryKey: ["controlled-terms"], queryFn: getControlledTerms, staleTime: oneDay});
}