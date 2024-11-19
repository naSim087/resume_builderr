import React from 'react';

import './App.css';
import ResumeState from './Context/ResumeState';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import About from './Pages/About/About';
import Explore from './Pages/explore/explore';
import CompanyRoles from './Pages/explore/companyRoles';
import AdminLogin from './Pages/adminlogin/adminlogin';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';
import AddCompany from './Pages/add/addCompany';
import AddRoles from './Pages/add/addRoles';
import AddResume from './Pages/add/addResume';
function App() {
  return (
    <ResumeState>
      <div className="App">
       
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/explore" element={<Explore />} />
          <Route path="/roles/:companyName" element={<CompanyRoles />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/addcompany" element={<AddCompany />} />
          <Route path="/addroles" element={<AddRoles />} />
          <Route path="/addresume" element={<AddResume />} />
        </Routes>
      </div>
    </ResumeState>
  );
}

export default App;
