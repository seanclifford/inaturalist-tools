interface ApiResult<T> {
    total_results: number;
    page: number;
    per_page: number;
    results: T[];
}

interface Site {
    id: number;
    name: string;
    site_name_short: string;
    url: string;
    icon_url: string;
}
