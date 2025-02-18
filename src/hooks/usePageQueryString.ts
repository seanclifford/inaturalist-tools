import { useLocalStorage } from "@mantine/hooks";

export function usePageQueryString() : [string, (_: string) => void] {
    const [savedQueryString, saveQueryString] = useLocalStorage({ key: 'pageQueryString', defaultValue: '' });

    const pageUrl = new URL(window.location.href);
    let pageQueryString = pageUrl.search.substring(1);
    if (pageQueryString === "") {
        pageQueryString = savedQueryString
        applyToWindowHistory(savedQueryString);
    }

    return [pageQueryString, (val: string) => {
        applyToWindowHistory(val);
        saveQueryString(val);
    }];
}

function applyToWindowHistory(pageQueryString: string) {
    const pageUrl = new URL(window.location.href);
    pageUrl.search = '?' + pageQueryString;
    window.history.pushState({}, '', pageUrl.toString());
}