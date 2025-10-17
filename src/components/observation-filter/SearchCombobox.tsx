import { CloseButton, Combobox, InputBase, useCombobox } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { Search } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";

interface SearchComboboxProps<T> {
	value: T | null;
	setValue: (val: T | null) => void;
	loading: boolean;
	autocompleteValues: T[];
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
		requestAutocomplete(query);
	}, 500);

	useEffect(() => {
		setSearch(getValue(value) ?? "");
	}, [value, getValue]);

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
					placeholder={loading ? "Loading..." : placeholder}
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
