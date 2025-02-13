interface ObservationControlledTerms {
    data: ControlledTerm[],
    status: "success" | "error" | "pending",
    error: Error | null
}