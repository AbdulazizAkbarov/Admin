import React from 'react'
import { Route, Routes } from 'react-router'
import App from './App'
import HomePage from './Pages/HomePage'
import ProductPage from './Pages/ProductPage'
import CatigoriesPage from './Pages/CatigoriesPage'

function MainPage() {
  return (
    <main className="w-full">
        
        <Routes>
            
        <Route path='/' element={<HomePage/>}/>
        <Route path='/product' element={<ProductPage/>}/>
        <Route path='/catigories' element={<CatigoriesPage/>}/>

        </Routes>
    </main>
    
  )
}

export default MainPage