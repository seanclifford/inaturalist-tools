import "./App.css";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppContent from "./AppContent";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";

function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<MantineProvider>
				<AppContent />
			</MantineProvider>
		</QueryClientProvider>
	);
}

export default App;
