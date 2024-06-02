import './App.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import Home from './pages/home'
import TestPage from './pages/test-page'
import Header from './components/header'
import { Route } from 'wouter'
import useSite from './hooks/useSite'

function App() {
  const queryClient = new QueryClient()
  const [site, setSite] = useSite()

  return (
    <QueryClientProvider client={queryClient}>
      <Header site={site}/>
      <Route path='/'><Home/></Route>
      <Route path='/test'><TestPage site={site} setSite={setSite}/></Route>
    </QueryClientProvider>
  )
}

export default App
