import { useSelector } from "react-redux";
import "./App.css";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/home/Index";
import Profile from "./pages/profile";

import { Routes, Route, Navigate } from "react-router-dom";
import Chat from "./pages/Chat/Chat";

function App() {
  const user = useSelector((state) => state.authReducer.authData);
  return (
    <div className="App">
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
        />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="../auth" />}
        />
        <Route path="/profile/:id" element={user ? <Profile /> : <Auth />} />

        <Route path="/auth" element={user ? <Home /> : <Auth />} />

        <Route path="/chat" element={user ? <Chat /> : <Auth />} />
      </Routes>
    </div>
  );
}

export default App;
