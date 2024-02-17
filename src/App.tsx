import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import useAuth from "./hooks/useAuth";
import { Dashboard } from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useAuth();
  
  return (
    <div className="App">
      {isAuthenticated ? (
        <>
          <Navbar setIsAuthenticated={setIsAuthenticated} />
          <Dashboard />
        </>
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
    </div>
  );
}

export default App;
