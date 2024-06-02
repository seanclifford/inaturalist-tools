import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { getSites } from "../inaturalist/api";
import { useState } from "react";

const oneDay = 24*60*60*1000;

function useSites(): UseQueryResult<Site[], Error> {
    const result = useQuery({queryKey: ["sites"], queryFn: getSites, staleTime: oneDay});
    return result;
}

function useSite() : [UseQueryResult<Site | undefined, Error>, React.Dispatch<React.SetStateAction<number>>] {
    const [siteId, setSiteId] = useState(0);
    if (siteId === 0)
        setSiteId(parseInt(localStorage.getItem("current-site-id") ?? "1"));
    const result = useQuery({queryKey: ["sites"], queryFn: getSites, staleTime: oneDay, select: (sites) => sites.find(s => s.id === siteId)});
    return [result, setSiteId];
}

function setSite(site: Site) {
    const [_, setSiteId] = useSite();
    localStorage.setItem("current-site-id", site.id.toString())
    setSiteId(site.id);
}

export {useSites, useSite, setSite};