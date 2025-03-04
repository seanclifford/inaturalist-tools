interface AnnotatorObservation {
    observation: Observation
    controlledTerms: ControlledTerm[]
}

interface AnnotationFunctions {
    saveAnnotation: (params: SaveAnnotationParams) => Promise<void>
    deleteAnnotation: (params: DeleteAnnotationParams) => Promise<void>
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