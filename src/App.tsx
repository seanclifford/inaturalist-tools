import { useState } from 'react'
import './App.css'
import Home from './pages/home'
import TestPage from './pages/test-page'
import Header from './components/header'
import { Route } from 'wouter'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

function App() {
  const [count, setCount] = useState(0)
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Header/>
      <Route path='/'><Home/></Route>
      <Route path='/test'><TestPage/></Route>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </QueryClientProvider>
  )
}

export default App
