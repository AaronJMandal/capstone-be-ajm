import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SignupLogin from "./components/SignupLogin";
import Dashboard from "./components/Dashboard";
import "./App.css";
import SignupConfirm from "./components/SignupConfirm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<SignupLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/confirm" element={<SignupConfirm />} />
      </Routes>
    </Router>
  );
}

export default App;
