import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Header from './component/Header/Header'
import Home from './component/Home/Home'
import Footer from './component/Footer/Footer'


const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
      <Route path='/' element={<Home/>}/>




      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
