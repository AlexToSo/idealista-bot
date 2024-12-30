import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Filters from './pages/filters'
import './App.css'

function App () {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/filters' element={<Filters />} />
      </Routes>
    </>
  )
}

export default App