import Home from './pages/home'
import TestPage from './pages/test-page'
import Header from './components/header'
import { Route } from 'wouter'
import { useEffect, useState } from 'react'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { sitesQueryOptions } from './inaturalist/queryOptions'

function AppContent() {
  const [siteId, setSiteId] = useState(parseInt(localStorage.getItem("current-site-id") ?? "1"));

  useEffect(() => {
    localStorage.setItem("current-site-id", siteId.toString())
  }, [siteId])

  const options = queryOptions({...sitesQueryOptions(), select: (sites) => sites.find(s => s.id === siteId)})
  const siteQuery = useQuery(options);

  const {isFetched, isError, error, data: site} = siteQuery;

  if (isFetched && site)
    return (
      <>
        <Header site={site}/>
        <Route path='/'><Home/></Route>
        <Route path='/test'><TestPage site={site} setSite={setSiteId}/></Route>
      </>
    )
  else if(isError) {
    return (
      <>
      <h1>ERROR</h1>
      <div>{error.name}</div>
      <div>{error.message}</div>
      </>
    );
  }
  else {
    return <div>Loading...</div>
  }
}

export default AppContent
