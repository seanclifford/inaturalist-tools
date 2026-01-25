import React from "react";
import ObservationHero from "../../components/observation-hero/ObservationHero";
import { AnnotationSelector } from "./AnnotationSelector";

interface AnnotatorSlideProps {
	annotatorObservation: AnnotatorObservation;
	annotationFunctions?: AnnotationFunctions;
}

const AnnotatorSlide = React.memo(function AnnotatorSlide({
	annotatorObservation,
	annotationFunctions,
}: AnnotatorSlideProps) {
	const { observation, controlledTerms } = annotatorObservation;

	return (
		<>
			<ObservationHero observation={observation} />
			{observation && controlledTerms && (
				<AnnotationSelector
					observationControlledTerms={controlledTerms}
					observation={observation}
					annotationFunctions={annotationFunctions}
				/>
			)}
		</>
	);
});

export default AnnotatorSlide;
