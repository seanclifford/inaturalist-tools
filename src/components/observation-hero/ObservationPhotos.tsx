import { Carousel } from "@mantine/carousel";
import { Center, Image } from "@mantine/core";
import getPhotoUrl from "../../inaturalist/photo-urls";

interface ObservationPhotosProps {
	photos: Photo[];
}

export default function ObservationPhotos({ photos }: ObservationPhotosProps) {
	return (
		<Center h="min(50vh, 100vw)" style={{ overflow: "hidden" }}>
			<Carousel
				h="min(50vh, 100vw)"
				orientation="vertical"
				align="start"
				withIndicators={photos.length > 1}
				withControls={photos.length > 1}
			>
				{photos.map((photo) => (
					<Carousel.Slide key={photo.id}>
						<Center h="min(50vh, 100vw)">
							<Image
								src={getPhotoUrl(photo, "medium")}
								style={{
									maxHeight: "min(50vh, 100vw)",
									width: "min(50vh, 100vw)",
								}}
							/>
						</Center>
					</Carousel.Slide>
				))}
			</Carousel>
		</Center>
	);
}
