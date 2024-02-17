import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Dashboard } from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(()=>{
    const token = localStorage.getItem('token');
    console.log(token?.length);
    if(token && token?.length > 0){
      setIsAuthenticated(true);
    }
  }, [])
  
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
