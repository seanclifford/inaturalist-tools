import './App.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import AppContent from './AppContent'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AppContent/>
    </QueryClientProvider>
  )
}

export default App
