import {
	CloseButton,
	Combobox,
	InputBase,
	Loader,
	ScrollArea,
	useCombobox,
} from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { Search } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";

interface SearchComboboxProps<T> {
	value: T | null;
	setValue: (val: T | null) => void;
	loading: boolean;
	autocompleteValues: AutocompleteResults<T>;
	requestAutocomplete: (search: string) => void; //Should this be a promise?
	label: string;
	placeholder: string;
	buildOption: (model: T) => ReactNode;
	getValue: (model: T | null) => string;
	getKey: (model: T | null) => number;
	leftSection?: ReactNode;
}

export function SearchCombobox<T>({
	value,
	setValue,
	loading,
	autocompleteValues,
	requestAutocomplete,
	label,
	placeholder,
	buildOption,
	getValue,
	getKey,
	leftSection,
}: SearchComboboxProps<T>) {
	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption(),
	});

	const [search, setSearch] = useState<string>("");

	const handleSearch = useDebouncedCallback((query: string) => {
		if (getValue(value) !== query || query.length === 0)
			requestAutocomplete(query);
	}, 500);

	useEffect(() => {
		setSearch(getValue(value) ?? "");
	}, [value, getValue]);

	useEffect(() => {
		handleSearch(search);
		if (search.length === 0) setValue(null);
	}, [handleSearch, setValue, search]);

	const options = autocompleteValues.results.map((item) => (
		<Combobox.Option value={getValue(item)} key={getKey(item)}>
			{buildOption(item)}
		</Combobox.Option>
	));

	function selectValue(val: string | null) {
		setValue(
			autocompleteValues.results.find((x) => getValue(x) === val) ?? null,
		);
	}

	return (
		<Combobox
			store={combobox}
			withinPortal={true}
			onOptionSubmit={(val) => {
				selectValue(val);
				combobox.closeDropdown();
			}}
		>
			<Combobox.Target>
				<InputBase
					label={label}
					disabled={loading}
					leftSection={loading ? null : (leftSection ?? <Search />)}
					rightSection={
						autocompleteValues.state === "loading" ? (
							<Loader size="sm" />
						) : value !== null ? (
							<CloseButton
								size="sm"
								onMouseDown={(event) => event.preventDefault()}
								onClick={() => setSearch("")}
								aria-label="Clear value"
							/>
						) : (
							<Combobox.Chevron />
						)
					}
					value={search}
					onChange={(event) => {
						combobox.openDropdown();
						combobox.updateSelectedOptionIndex();
						setSearch(event.currentTarget.value);
					}}
					onClick={() => combobox.openDropdown()}
					onFocus={() => combobox.openDropdown()}
					onBlur={() => {
						combobox.closeDropdown();
						setSearch(getValue(value) || "");
					}}
					placeholder={loading ? "Loading..." : placeholder}
					rightSectionPointerEvents={value === null ? "none" : "all"}
				/>
			</Combobox.Target>

			<Combobox.Dropdown hidden={autocompleteValues.state !== "loaded"}>
				<Combobox.Options>
					<ScrollArea.Autosize mah="42vh">
						{options.length > 0 ? (
							options
						) : (
							<Combobox.Empty>Nothing found</Combobox.Empty>
						)}
					</ScrollArea.Autosize>
				</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	);
}
