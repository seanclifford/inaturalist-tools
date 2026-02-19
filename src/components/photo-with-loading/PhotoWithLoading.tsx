import { Box, Center, Image, LoadingOverlay } from "@mantine/core";
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
		<Center>
			<Box>
				<LoadingOverlay
					visible={loading}
					zIndex={1000}
					overlayProps={{ backgroundOpacity: 0.3 }}
				/>
			</Box>
			<Image
				src={imgSrc}
				className={loading ? classes.photoLoading : classes.photo}
				h={h}
			/>
		</Center>
	);
}
