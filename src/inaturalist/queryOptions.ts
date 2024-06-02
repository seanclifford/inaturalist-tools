import { queryOptions, } from "@tanstack/react-query";
import { getSites } from "./api";

const oneDay = 24*60*60*1000;

function sitesQueryOptions() {
    return queryOptions({queryKey: ["sites"], queryFn: getSites, staleTime: oneDay});
}

export {sitesQueryOptions};