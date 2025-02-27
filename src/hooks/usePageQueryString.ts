import { useLocation, useSearch } from "wouter";

export function usePageQueryString() : [string, (_: string) => void] {
    
    const [ location, navigate ] = useLocation();
    const pageQueryString = useSearch();

    const setPageQueryString = (newPageQueryString : string) => {
        navigate(`${location}?${newPageQueryString}`);
    }

    return [pageQueryString, setPageQueryString];
}