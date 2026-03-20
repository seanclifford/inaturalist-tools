export const outerHeight = "min(50vh, 100vw)";
export const outerWidth = "min(50vh, 100vw)";

export const photoBannerHeight = "4.1em";

export function getMainImageHeight(photoCount: number) {
	const subtractAmount = photoCount > 1 ? ` - ${photoBannerHeight}` : "";
	return `min(50vh${subtractAmount}, 100vw${subtractAmount})`;
}
