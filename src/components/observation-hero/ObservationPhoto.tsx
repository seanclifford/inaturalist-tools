import { Center, Text } from "@mantine/core";
import PhotoWithLoading from "../photo-with-loading/PhotoWithLoading";

interface ObservationPhotoProps {
	photo: Photo;
	h: string;
}

export default function ObservationPhoto({ photo, h }: ObservationPhotoProps) {
	if (photo) return <PhotoWithLoading photo={photo} h={h} size="medium" />;

	return (
		<Center h={h}>
			<Text size="xl" c="dimmed">
				No Image
			</Text>
		</Center>
	);
}
