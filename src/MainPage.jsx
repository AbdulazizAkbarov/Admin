import React from 'react'
import { Route, Routes } from 'react-router'
import App from './App'
import HomePage from './Pages/HomePage'
import ProductPage from './Pages/ProductPage'
import CatigoriesPage from './Pages/CatigoriesPage'
import Ijaralar from './Pages/Ijaralar'
import Users from './Pages/Users'
import Kitoblarim from './Pages/Kitoblarim'
import Books from './Pages/Books'

function MainPage() {
  return (
    <main className="w-full">
        
        <Routes>
            
        <Route path='/' element={<HomePage/>}/>
        <Route path='/product' element={<ProductPage/>}/>
        <Route path='/catigories' element={<CatigoriesPage/>}/>
        <Route path='/ijaralar' element={<Ijaralar/>}/>
        <Route path='/user' element={<Users/>}/>
        <Route path='/kitoblarim' element={<Kitoblarim/>}/>
        <Route path='/books' element={<Books/>}/>





        </Routes>
    </main>
    
  )
}

export default MainPage