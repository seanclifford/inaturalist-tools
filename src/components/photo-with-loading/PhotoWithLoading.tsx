import { Image } from "@mantine/core";
import useProgressiveImage from "../../hooks/useProgressiveImage";
import getPhotoUrl from "../../inaturalist/photo-urls";
import classes from "./PhotoWithLoading.module.css";

interface PhotoWithLoadingProps {
	photo: Photo;
	h: string;
	size: PhotoSize;
}

export default function PhotoWithLoading({
	photo,
	h,
	size,
}: PhotoWithLoadingProps) {
	const [imgSrc, loading] = useProgressiveImage(
		getPhotoUrl(photo, "thumb"),
		getPhotoUrl(photo, size),
	);

	return (
		<Image
			src={imgSrc}
			className={loading ? classes.photoLoading : classes.photo}
			h={h}
		/>
	);
}
