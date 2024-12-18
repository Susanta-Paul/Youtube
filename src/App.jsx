import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import RootLayout from "./Layout/RootLayout.jsx"
import Feature from "./Components/Feature.jsx"
import Sidebar from "./Layout/Sidebar.jsx"
import Home from "./Pages/Home.jsx"
import Video from "./Pages/Video.jsx"
import Search from "./Pages/Search.jsx"
import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from "react-router-dom"

function App() {

  // const API=import.meta.env.VITE_API_KEY;
  const API=import.meta.env.VITE_API
  // const API="AIzaSyDjOB_NE-dQ5lVc88c1nsDO8Z6VEvVjMmc"

  const router=createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout api={API} />} >
        <Route index element={<Home api={API} />} />
        <Route path="search/:query" element={<Search api={API} />} />
        <Route path="video/:id" element={<Video api={API} />} />
      </Route>
    )
  )


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
