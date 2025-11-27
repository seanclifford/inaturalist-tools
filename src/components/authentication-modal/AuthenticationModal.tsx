import { Modal } from "@mantine/core";
import AccountSettings from "../account-settings/AccountSettings";
import classes from "./AuthenticationModal.module.css";

interface AuthenticationModalProps {
	opened: boolean;
	close: () => void;
}

export default function AuthenticationModal({
	opened,
	close,
}: AuthenticationModalProps) {
	return (
		<Modal
			opened={opened}
			onClose={close}
			title="You must authenticate before making changes"
			centered
			size="lg"
			classNames={{ content: classes.content }}
		>
			<AccountSettings />
		</Modal>
	);
}
