import ObservationHero from "../../components/observation-hero/ObservationHero";
import { AnnotationSelector } from "./AnnotationSelector";
import { Carousel } from "@mantine/carousel";

interface AnnotatorGalleryProps {
    annotatorObservations: AnnotatorObservation[]
    site: Site;
}

export default function AnnotatorGallery( {annotatorObservations, site}: AnnotatorGalleryProps ) {
    return (
        <Carousel slideGap="md" slideSize="50vh" initialSlide={0}>
            {annotatorObservations?.map(annotatorObservation => {
            const { observation, controlledTerms } = annotatorObservation;
            
            return (<Carousel.Slide key={observation.id}>
                <ObservationHero observation={observation} site={site} />
                {observation && controlledTerms ? <AnnotationSelector observationControlledTerms={controlledTerms} observation={observation} /> : null}
            </Carousel.Slide>)
            })}
        </Carousel>
        );
}