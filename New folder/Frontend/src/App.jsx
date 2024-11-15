import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import LandingPage from './pages/LadingPage'
import Header from './components/Header'
import Footer from './components/Footer'
import BookingPage from './pages/BookingPage'
import ServicesPage from './pages/ServicePage'
import ContactPage from './pages/ContactPage'



const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path="/book" element={<BookingPage/>} />
        <Route path="/services" element={<ServicesPage />} /> {/* Optional */}
        <Route path="/contact" element={<ContactPage />} /> {/* Optional */}
       </Routes>
      <Footer/>
    </Router>
  )
}

export default App
