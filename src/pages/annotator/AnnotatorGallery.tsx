import { Carousel } from "@mantine/carousel";
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
			return <div key="loading">Loading...</div>;
		case "error":
			return (
				<div key="loading">
					Error: {error?.name ?? "unknown"} {error?.message}
				</div>
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
