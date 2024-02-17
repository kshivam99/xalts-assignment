import { useEffect, useState } from "react";

const useAuth = (): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
] => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && token?.length > 0) {
      setIsAuthenticated(true);
    }
  }, []);

  return [isAuthenticated, setIsAuthenticated];
};

export default useAuth;
