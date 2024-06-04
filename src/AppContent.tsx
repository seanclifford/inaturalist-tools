import Home from './pages/home'
import SiteSelectionPage from './pages/site-selection'
import Header from './components/header'
import { Route } from 'wouter'
import useSite from './hooks/useSite'

function AppContent() {
  const [site, setSite] = useSite()

  return (
    <>
      <Header site={site}/>
      <Route path='/'><Home/></Route>
      <Route path='/site-selection'><SiteSelectionPage site={site} setSite={setSite}/></Route>
    </>
  )
}

export default AppContent
