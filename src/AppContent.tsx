import Home from './pages/home'
import TestPage from './pages/test-page'
import Header from './components/header'
import { Route } from 'wouter'
import { useEffect, useState } from 'react'
import { loadSite, saveSite } from './state/site'

function AppContent() {
  const [site, setSite] = useState(loadSite());

  useEffect(() => { saveSite(site) }, [site])

  return (
    <>
      <Header site={site}/>
      <Route path='/'><Home/></Route>
      <Route path='/test'><TestPage site={site} setSite={setSite}/></Route>
    </>
  )
}

export default AppContent
