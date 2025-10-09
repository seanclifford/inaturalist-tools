export function getSiteUrlParams(site: Site) {
	const params = new URLSearchParams();
	params.append("locale", site.locale ?? navigator.language);
	if (site.place_id)
		params.append("preferred_place_id", site.place_id.toString());

	return params;
}
