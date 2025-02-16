import Home from './pages/home'
import SiteSelectionPage from './pages/site-selection'
import Header from './components/header'
import { Route } from 'wouter'
import useSite from './hooks/useSite'
import useAuthentication from './hooks/useAuthentication'
import Annotator from './pages/annotator'

function AppContent() {
  const [site, setSite] = useSite();
  const [authentication] = useAuthentication()
  return (
    <>
      <Header site={site}/>
      <Route path='/'><Home/></Route>
      <Route path='/site-selection'><SiteSelectionPage site={site} setSite={setSite}/></Route>
      <Route path='/annotator'><Annotator site={site} currentUser={authentication.currentUser}/></Route>
    </>
  )
}

export default AppContent
