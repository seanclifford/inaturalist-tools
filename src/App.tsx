import { useState } from 'react'
import './App.css'
import Home from './pages/home'
import TestPage from './pages/test-page'
import Header from './components/header'
import { Route } from 'wouter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Route path='/'><Home/></Route>
      <Route path='/test'><TestPage/></Route>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
