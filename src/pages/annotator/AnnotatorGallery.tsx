import ObservationHero from "../../components/observation-hero/ObservationHero";
import { AnnotationSelector } from "./AnnotationSelector";
import { Carousel } from "@mantine/carousel";

interface AnnotatorGalleryProps {
	annotatorObservations: AnnotatorObservation[];
	annotationFunctions?: AnnotationFunctions;
	loadMore: () => void;
}

export default function AnnotatorGallery({
	annotatorObservations,
	annotationFunctions,
	loadMore,
}: AnnotatorGalleryProps) {
	const onSlideChange = (index: number) => {
		if (index + 6 >= annotatorObservations.length) loadMore();
	};
	return (
		<Carousel
			slideGap="md"
			slideSize="min(50vh, 100vw)"
			initialSlide={0}
			onSlideChange={onSlideChange}
		>
			{annotatorObservations?.map((annotatorObservation) => {
				const { observation, controlledTerms } = annotatorObservation;

				return (
					<Carousel.Slide key={observation.id}>
						<ObservationHero observation={observation} />
						{observation && controlledTerms ? (
							<AnnotationSelector
								observationControlledTerms={controlledTerms}
								observation={observation}
								annotationFunctions={annotationFunctions}
							/>
						) : null}
					</Carousel.Slide>
				);
			})}
		</Carousel>
	);
}
