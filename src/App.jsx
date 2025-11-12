// import {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './App.css'
import { Routes,Route,BrowserRouter } from 'react-router-dom'
import Navb from './components/Navb.jsx'
import LoginPage from './components/LoginPage.jsx'
import RegisterPage from './components/RegisterPage.jsx'
import ProjectsPage from './components/ProjectsPage.jsx'
import HomePage from './components/HomePage.jsx'
import Projectslist from './components/Projectslist.jsx'
function App() {

  return (
    <div >
      <BrowserRouter basename='/project-frontend/'>
        <Navb />
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/createproject" element={<ProjectsPage />} />
          <Route path="/projectslist" element={<Projectslist/>} />
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
