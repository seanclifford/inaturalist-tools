interface AnnotatorObservation {
    observation: Observation
    controlledTerms: ControlledTerm[]
}

interface AnnotationFunctions {
    saveAnnotation: (_: SaveAnnotationParams) => Promise<NewAnnotation>
    deleteAnnotation: (_: DeleteAnnotationParams) => Promise<void>
}

interface SaveAnnotationParams {
    observationId: number
    controlledTermId: number
    controlledValueId: number
}

interface DeleteAnnotationParams {
    observationId: number
    annotationId: string
}

interface AddAnnotationParams extends AnnotationBase {
    resource_id :number,
    resource_type: string
}

interface NewAnnotation extends AddAnnotationParams {
    id: number
    uuid: string
    user_id: number
}

interface AnnotationBase {
    controlled_attribute_id: number
    controlled_value_id: number
}