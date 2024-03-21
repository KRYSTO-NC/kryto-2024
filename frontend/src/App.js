import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './sass/main.css'

import ScrollToTop from './components/utils/ScrollToTop'

import { Outlet } from 'react-router-dom'
import Navbar from './components/layout/navbar/Navbar'
import Footer from './components/layout/footer/Footer'

const App = () => {
  return (
    <>
      <ToastContainer />
      <ScrollToTop />

      <>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </>
    </>
  )
}

export default App
