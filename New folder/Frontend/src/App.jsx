import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Header from './component/Header/Header'
import Home from './component/Home/Home'
import Footer from './component/Footer/Footer'
import Service from './component/Service/Service'
import About from './component/About/About'
import Contact from './component/Contact/Contact'


const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/service' element={<Service/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>





      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
