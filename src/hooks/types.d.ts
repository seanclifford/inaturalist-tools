interface AutocompleteResults<T> {
	results: T[];
	state: AutocompeteStatus;
}

type AutocompeteStatus = "not-searched" | "loading" | "loaded";
