import { Avatar } from "@mantine/core";
import { Search } from "lucide-react";
import { useCallback, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { useUsersAutocomplete } from "../../hooks/useUsersAutocomplete";
import UserAccount from "../user-account/UserAccount";
import { SearchCombobox } from "./SearchCombobox";

interface UserComboboxProps {
	userId: string | null;
	onSelect: (user: User | null) => void;
}

export function UserCombobox({ userId, onSelect }: UserComboboxProps) {
	const [search, setSearch] = useState("");
	const { data: value, isLoading } = useUser(userId);
	const users = useUsersAutocomplete(search);

	const comboSetValue = useCallback(
		(user: User | null) => {
			if (user?.id === value?.id) return;

			onSelect(user);
		},
		[value, onSelect],
	);

	const getKey = useCallback((user: User | null) => user?.id ?? 0, []);
	const getUserName = useCallback((user: User | null) => user?.login || "", []);
	const buildOption = useCallback(
		(user: User) => <UserAccount user={user} size="sm" />,
		[],
	);

	return (
		<SearchCombobox
			value={value ?? null}
			setValue={comboSetValue}
			loading={isLoading}
			autocompleteValues={users}
			requestAutocomplete={setSearch}
			label="User"
			placeholder="Search for a user"
			getKey={getKey}
			getValue={getUserName}
			buildOption={buildOption}
			leftSection={
				value ? (
					<Avatar src={value.icon} alt={value.login} size="sm" />
				) : (
					<Search />
				)
			}
		/>
	);
}
