import  { Avatar, Group, Text } from "@mantine/core";
import type { MantineSize } from "@mantine/core";

interface UserAccountProps {
	user: User;
	size?: MantineSize;
}

export default function UserAccount({ user, size }: UserAccountProps) {
	return (
		<Group gap="xs">
			<Avatar
				src={user.icon}
				alt={user.login}
				size={size}
				bd="darkgrey solid thin"
			/>
			<Text size={size}>{user.login}</Text>
		</Group>
	);
}
