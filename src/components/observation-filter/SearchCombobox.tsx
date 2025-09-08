import { CloseButton, Combobox, InputBase, useCombobox } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { type ReactNode, useEffect, useState } from "react";

interface SearchComboboxProps<T> {
	value: T | null;
	setValue: (val: T | null) => void;
	autocompleteValues: T[];
	requestAutocomplete: (search: string) => void; //Should this be a promise?
	placeholder: string;
	buildOption: (model: T) => ReactNode;
	getValue: (model: T | null) => string;
	getKey: (model: T | null) => number;
}

export function SearchCombobox<T>({
	value,
	setValue,
	autocompleteValues,
	requestAutocomplete,
	placeholder,
	buildOption,
	getValue,
	getKey,
}: SearchComboboxProps<T>) {
	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption(),
	});

	const [search, setSearch] = useState(() => getValue(value));

	const handleSearch = useDebouncedCallback((query: string) => {
		requestAutocomplete(query);
	}, 500);

	useEffect(() => {
		handleSearch(search);
	}, [handleSearch, search]);

	const options = autocompleteValues.map((item) => (
		<Combobox.Option value={getValue(item)} key={getKey(item)}>
			{buildOption(item)}
		</Combobox.Option>
	));

	function selectValue(val: string | null) {
		setValue(autocompleteValues.find((x) => getValue(x) === val) ?? null);
		setSearch(val ?? "");
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
					rightSection={
						value !== null ? (
							<CloseButton
								size="sm"
								onMouseDown={(event) => event.preventDefault()}
								onClick={() => selectValue(null)}
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
					placeholder={placeholder}
					rightSectionPointerEvents={value === null ? "none" : "all"}
				/>
			</Combobox.Target>

			<Combobox.Dropdown>
				<Combobox.Options>
					{options.length > 0 ? (
						options
					) : (
						<Combobox.Empty>Nothing found</Combobox.Empty>
					)}
				</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	);
}
