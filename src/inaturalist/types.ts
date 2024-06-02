interface ApiResult<T> {
    total_results: number;
    page: number;
    per_page: number;
    results: Array<T>;
}

interface Site {
    id: number;
    name: string;
    site_name_short: string;
    icon_url: string;
}
