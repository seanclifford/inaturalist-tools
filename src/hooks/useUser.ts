import { useQuery } from "@tanstack/react-query";
import { oneDay } from "../constants/values";
import { getUser } from "../inaturalist/api";

export function useUser(id: string | null) {
	return useQuery({
		queryKey: ["user", id],
		queryFn: () => getUser(id),
		staleTime: oneDay,
	});
}
