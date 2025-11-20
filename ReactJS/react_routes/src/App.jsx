import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Header from './component/Header'
import Footer from './component/Footer'
import About from './pages/About'
import Contact from './pages/Contact'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<><Header/><Home/><Footer/></>}></Route>
          <Route path='/about' element={<><Header/><About/><Footer/></>}></Route>
          <Route path='/contact' element={<><Header/><Contact/><Footer/></>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App