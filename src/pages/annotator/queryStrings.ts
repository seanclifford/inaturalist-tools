export function getPageQueryString() : string {
    const pageUrl = new URL(window.location.href);
    return pageUrl.search.substring(1);
}

export function setPageQueryString(query: string) {
    const pageUrl = new URL(window.location.href);
    pageUrl.search = '?' + query;
    window.history.pushState({}, '', pageUrl.toString());
}