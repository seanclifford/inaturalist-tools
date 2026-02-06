import "./App.css";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppContent from "./AppContent";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import useTheme from "./hooks/useTheme";

function App() {
	const queryClient = new QueryClient();
	const theme = useTheme();

	return (
		<QueryClientProvider client={queryClient}>
			<MantineProvider theme={theme}>
				<AppContent />
			</MantineProvider>
		</QueryClientProvider>
	);
}

export default App;
