import React from 'react'
import { Route, Routes } from 'react-router-dom'


import Home from "./Home"
import About from "./About"
import Contact from "./Contact"
import NoPage from 'components/NoPage'
// Header and Footer 
import Header from 'components/Header'
import Footer from 'components/Footer'
import Apply from './Apply'

export default function Index() {
    return (
        <>
          <Header />
          <main>

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='about' element={<About />} />
                <Route path='contact' element={<Contact />} />
                <Route path='apply' element={<Apply />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
          </main>
            <Footer />
        </>
    )
}
