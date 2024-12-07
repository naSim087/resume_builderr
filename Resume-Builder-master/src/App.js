// import React from 'react';
// import './App.css';
// import ResumeState from './Context/ResumeState';
// import { Routes, Route } from 'react-router-dom';
// import Home from './Pages/Home/Home';
// import Navbar from './Components/Navbar/Navbar';
// import About from './Pages/About/About';
// import Explore from './Pages/explore/explore';
// import CompanyRoles from './Pages/explore/companyRoles';
// import AdminLogin from './Pages/adminlogin/adminlogin';
// import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';
// import AddCompany from './Pages/add/addCompany';
// import AddRoles from './Pages/add/addRoles';
// import AddResume from './Pages/add/addResume';
// import MatchResume from './Pages/matchPercentage/match';
// function App() {
//   const handleChatButton = () => {
    
//       const url = "http://localhost:3000"; // Replace with your desired URL
//       window.open(url, "_blank"); // Opens the URL in a new tab
   
//   };

//   return (
//     <ResumeState>
//       <div className="App">
//         <Navbar />
//         {/* Chat Button */}
//         <button
//           onClick={handleChatButton}
//           style={{
//             position: "fixed",
//             bottom: "20px",
//             right: "20px",
//             backgroundColor: "#007bff",
//             color: "white",
//             padding: "15px 20px",
//             border: "none",
//             borderRadius: "50px",
//             fontSize: "16px",
//             cursor: "pointer",
//             boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//             zIndex: 1000,
//             transition: "transform 0.3s ease, backgroundColor 0.3s ease",
//           }}
//           onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
//           onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
//         >
//           Ask Senior
//         </button>

//         {/* Routes */}
//         <Routes>
//           <Route exact path="/" element={<Home />} />
//           <Route exact path="/home" element={<Home />} />
//           <Route exact path="/about" element={<About />} />
//           <Route exact path="/explore" element={<Explore />} />
//           <Route path="/roles/:companyName" element={<CompanyRoles />} />
//           <Route path="/adminlogin" element={<AdminLogin />} />
//           <Route path="/admindashboard" element={<AdminDashboard />} />
//           <Route path="/addcompany" element={<AddCompany />} />
//           <Route path="/addroles" element={<AddRoles />} />
//           <Route path="/addresume" element={<AddResume />} />
//           <Route path="/matchresume" element={<MatchResume />} />

//         </Routes>
//       </div>
//     </ResumeState>
//   );
// }

// export default App;

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
import MatchResume from './Pages/matchPercentage/match';
import NewPage from './Pages/NewPages/newPage'; // Import the new page

function App() {
  const handleChatButton = () => {
    const url = "http://localhost:3000"; // Replace with your desired URL
    window.open(url, "_blank"); // Opens the URL in a new tab
  };

  return (
    <ResumeState>
      <div className="App">
        <Navbar />
        {/* Chat Button */}
        <button
          onClick={handleChatButton}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "#007bff",
            color: "white",
            padding: "15px 20px",
            border: "none",
            borderRadius: "50px",
            fontSize: "16px",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            transition: "transform 0.3s ease, backgroundColor 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Ask Senior
        </button>

        {/* Routes */}
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
          <Route path="/matchresume" element={<MatchResume />} />
          <Route path="/newpage" element={<NewPage />} /> {/* Add the route for NewPage */}
        </Routes>
      </div>
    </ResumeState>
  );
}

export default App;
