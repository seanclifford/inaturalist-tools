import { Box, Group, Image } from "@mantine/core";
import { useState } from "react";
import getPhotoUrl from "../../inaturalist/photo-urls";
import {
	getMainImageHeight,
	outerHeight,
	photoBannerHeight,
} from "./dimensions";
import ObservationPhoto from "./ObservationPhoto";
import classes from "./ObservationPhotos.module.css";

interface ObservationPhotosProps {
	photos: Photo[];
}

export default function ObservationPhotos({ photos }: ObservationPhotosProps) {
	const [photoIndex, setPhotoIndex] = useState(0);
	const photo = photos[photoIndex];
	const imageHeight = getMainImageHeight(photos.length);

	return (
		<Box h={outerHeight}>
			{photos.length > 1 ? (
				<Group
					justify="center"
					h={photoBannerHeight}
					pl="0.3em"
					pr="0.3em"
					gap="0.3em"
				>
					{photos.map((photo, index) => (
						<Image
							key={photo.id}
							src={getPhotoUrl(photo, "thumb")}
							w="3.5em"
							className={
								index === photoIndex ? classes.selected : classes.thumbnail
							}
							onClick={() => setPhotoIndex(index)}
						/>
					))}
				</Group>
			) : null}

			<ObservationPhoto photo={photo} h={imageHeight} />
		</Box>
	);
}
