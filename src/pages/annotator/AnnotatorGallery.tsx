import { Carousel } from "@mantine/carousel";
import { Center, Loader, Stack, Text } from "@mantine/core";
import { useCallback } from "react";
import AnnotatorSlide from "./AnnotatorSlide";
import { useAnnotatorObservations } from "./useAnnotatorObservations";

interface AnnotatorGalleryProps {
	submittedQueryString: string;
	openAuthentication: () => void;
}

export default function AnnotatorGallery({
	submittedQueryString,
	openAuthentication,
}: AnnotatorGalleryProps) {
	const {
		annotatorObservations,
		status,
		error,
		annotationFunctions,
		loadMore,
	} = useAnnotatorObservations(submittedQueryString, openAuthentication);

	const onSlideChange = useCallback(
		(index: number) => {
			if (!annotatorObservations || !loadMore) return;
			if (index + 6 >= annotatorObservations.length) loadMore();
		},
		[annotatorObservations, loadMore],
	);

	switch (status) {
		case "pending":
			return (
				<Center key="loading" h="100vh">
					<Stack align="center">
						<Text size="lg">Loading Observations</Text>
						<Loader size={40} />
					</Stack>
				</Center>
			);
		case "error":
			return (
				<Center key="loading">
					<Stack>
						<Text>Error: {error?.name ?? "unknown"}</Text>{" "}
						<Text>{error?.message}</Text>
					</Stack>
				</Center>
			);
		case "success":
			return (
				<Carousel
					slideGap="md"
					slideSize="min(50vh, 100vw)"
					initialSlide={0}
					onSlideChange={onSlideChange}
				>
					{annotatorObservations?.map((annotatorObservation) => {
						return (
							<Carousel.Slide key={annotatorObservation.observation.id}>
								<AnnotatorSlide
									annotatorObservation={annotatorObservation}
									annotationFunctions={annotationFunctions}
								/>
							</Carousel.Slide>
						);
					})}
				</Carousel>
			);
	}
}
