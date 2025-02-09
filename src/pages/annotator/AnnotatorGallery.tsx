import { useQuery } from "@tanstack/react-query";
import { getObservations } from "../../inaturalist/api";

import ObservationHero from "../../components/observation-hero/ObservationHero";
import { AnnotationSelector } from "../../components/annotation-selector/AnnotationSelector";
import { Group } from "@mantine/core";
import { Carousel } from "@mantine/carousel";

interface AnnotatorGalleryProps {
    submitedQueryString: string;
    site: Site;
}

export default function AnnotatorGallery( {submitedQueryString, site}: AnnotatorGalleryProps ) {

    const generateQueryString = (query: string) : URLSearchParams =>{
        const searchParams = new URLSearchParams(query);
        return searchParams;
    };

    const { isPending, isError, data: observations, error } = useQuery({queryKey: ["observations", submitedQueryString], queryFn: () => getObservations(generateQueryString(submitedQueryString))});

    if (isPending) {
        return (<div>Loading...</div>);
    }
    if (isError) {
        return (<div>Error: {error?.name ?? "unknown"} {error?.message}</div>);
    }

    return (
       
        <Carousel slideGap="md" slideSize="50vh" initialSlide={0}>
            {observations?.map(observation => 
            <Carousel.Slide key={observation.id}>
                <ObservationHero observation={observation} site={site} />
                {observation ? <AnnotationSelector observation={observation} /> : null}
            </Carousel.Slide>
            )}
        </Carousel>
        );
}