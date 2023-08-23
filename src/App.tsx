import React from 'react'
import "./styles/globals.scss"
import Home from "./pages/Home"
import {AxiosInterceptor} from "./extendedAxios"
import Header from "./modules/Header"

function App() {
  return (
      <>
          <Header/>
          <AxiosInterceptor/>
          <Home/>
      </>
  )
}

export default App
