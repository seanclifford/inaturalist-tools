import './App.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import AppContent from './AppContent'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css';

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <AppContent/>
      </MantineProvider>
    </QueryClientProvider>
  )
}

export default App
