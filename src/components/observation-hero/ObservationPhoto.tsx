import { Image } from "@mantine/core";
import useProgressiveImage from "../../hooks/useProgressiveImage";
import getPhotoUrl from "../../inaturalist/photo-urls";
import classes from "./ObservationPhoto.module.css";

interface ObservationPhotoProps {
	photo: Photo;
	h: string;
}

export default function ObservationPhotos({ photo, h }: ObservationPhotoProps) {
	const [imgSrc, loading] = useProgressiveImage(
		getPhotoUrl(photo, "thumb"),
		getPhotoUrl(photo, "medium"),
	);

	return (
		<Image
			src={imgSrc}
			className={loading ? classes.photoLoading : classes.photo}
			h={h}
		/>
	);
}
