// import {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Navb from './components/Navb.jsx'
import LoginPage from './components/LoginPage.jsx'
import RegisterPage from './components/RegisterPage.jsx'
import ProjectsPage from './components/ProjectsPage.jsx'
import HomePage from './components/HomePage.jsx'
import Projectslist from './components/Projectslist.jsx'
import EditProject from './components/EditProject.jsx'
import Footer from './components/Footer.jsx'
function App() {
  // const api_url = 'http://127.0.0.1:8000/api/';
  const api_url = 'https://project-backend-sigma-lac.vercel.app/api/';
  return (
    <div className="App">
      <BrowserRouter basename='/project-frontend'>
        <Navb api_url={api_url}/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage api_url={api_url} />} />
          <Route path="/register" element={<RegisterPage api_url={api_url} />} />
          <Route path="/createproject" element={<ProjectsPage api_url={api_url} />} />
          <Route path="/projectslist" element={<Projectslist api_url={api_url} />} />
          <Route path="/projectslist/:id" element={<EditProject api_url={api_url} />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
