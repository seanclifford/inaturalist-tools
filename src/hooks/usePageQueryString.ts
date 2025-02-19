import { useLocalStorage } from "@mantine/hooks";

export function usePageQueryString() : [string, (_: string) => void] {
    const [savedQueryString, saveQueryString] = useLocalStorage({ key: 'pageQueryString', defaultValue: '' });

    const pageUrl = new URL(window.location.href);
    let pageQueryString = pageUrl.search.substring(1);
    if (pageQueryString === "") {
        pageQueryString = savedQueryString
        applyToWindowHistory(savedQueryString, true);
    }

    return [pageQueryString, (val: string) => {
        applyToWindowHistory(val, false);
        saveQueryString(val);
    }];
}

function applyToWindowHistory(pageQueryString: string, replace: boolean) {
    const pageUrl = new URL(window.location.href);
    pageUrl.search = '?' + pageQueryString;
    if(replace) {
        window.history.replaceState({}, '', pageUrl.toString())
    } else {
        window.history.pushState({}, '', pageUrl.toString());
    }
}