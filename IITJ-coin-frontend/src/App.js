import Navbar from "./components/navbar";
import Home from "./components/home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
import AdminPanel from "./components/adminPanel";
import AddProducts from "./components/addProduct";
import React from "react";
import Redeem from "./components/redeem";
import Account from "./components/account";
import "./App.css";
function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/admin" element={<AdminPanel />} />
          <Route exact path="/addProduct" element={<AddProducts />} />
          <Route exact path="/redeem" element={<Redeem />} />
          <Route exact path="/account" element={<Account />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
