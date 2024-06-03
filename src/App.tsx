import './App.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import Home from './pages/home'
import SiteSelectionPage from './pages/site-selection'
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
      <Route path='/site-selection'><SiteSelectionPage site={site} setSite={setSite}/></Route>
    </QueryClientProvider>
  )
}

export default App
