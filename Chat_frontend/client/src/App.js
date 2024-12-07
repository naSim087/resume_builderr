import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth/Auth";
import FriendRequestsPage from "./pages/FriendRequestPage/FriendRequestsPage";
import Profile from "./pages/Profile/Profile";
import Chat from "./pages/Chat/Chat";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.authReducer.authData);

  // Function to handle chat button click
  const handleChatClick = () => {
    window.open("http://localhost:3001"); // Opens chat in a new tab
  };

  return (
    <div
      className="App"
      style={{
        height: window.location.pathname === "/chat" ? "calc(100vh - 2rem)" : "auto",
      }}
    >
      {/* Background blur effects */}
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>

      {/* Chat Button (persistent on all pages) */}
      
      <button
          onClick={handleChatClick}
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
          Explore Resume
        </button>

      {/* Routes definition */}
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/home" /> : <Navigate to="/auth" />}
        />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={user ? <Navigate to="/home" /> : <Auth />}
        />
        <Route
          path="/friend-requests"
          element={user ? <FriendRequestsPage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="/auth" />}
        />
        <Route
          path="/chat"
          element={user ? <Chat /> : <Navigate to="/auth" />}
        />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
