import { useQuery } from "@tanstack/react-query";
import { oneDay } from "../constants/values";
import { getProject } from "../inaturalist/api";

export function useProject(id: string | null) {
	return useQuery({
		queryKey: ["project", id],
		queryFn: () => getProject(id),
		staleTime: oneDay,
	});
}
