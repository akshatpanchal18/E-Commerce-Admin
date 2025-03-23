// import { createContext, useContext, useState } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const URL = "https://e-commerce-server-b1yi.onrender.com/api/v1";

//   const login = async (loginData) => {
//     // console.log(loginData);

//     const res = await fetch(`${URL}/user/login-admin`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(loginData),
//       credentials: "include",
//     });
//     const result = await res.json();
//     console.log(result);
//     if (result.statusCode === 200) {
//       setIsAuthenticated(true);
//       localStorage.setItem("isAuth", "true");
//     } else {
//       console.log(Error);
//     }
//   };
//   const logout = async () => {
//     try {
//       const res = await fetch(`${URL}/user/logout-admin`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//       });
//       const result = await res.json();
//       console.log(result);
//       if (result.statusCode === 200) {
//         console.log("Removing localStorage item before logout...");
//         localStorage.removeItem("isAuth");
//         console.log("isAuth after logout:", localStorage.getItem("isAuth"));
//         setIsAuthenticated(false); // This updates your application state
//       } else {
//         console.error("Logout failed:", result.message || "Unknown error");
//       }
//     } catch (error) {
//       console.error("Error during logout:", error.message);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ login, isAuthenticated, URL, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const URL = "https://e-commerce-server-b1yi.onrender.com/api/v1";
  // const URL = import.meta.env.SERVER;

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuth") === "true"; // Load from localStorage
  });

  useEffect(() => {
    localStorage.setItem("isAuth", isAuthenticated ? "true" : "false");
  }, [isAuthenticated]); // Sync with localStorage on change

  const login = async (loginData) => {
    try {
      const res = await fetch(`${URL}/user/login-admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
        credentials: "include",
      });

      const result = await res.json();
      console.log(result);

      if (result.statusCode === 200) {
        setIsAuthenticated(true);
      } else {
        console.error("Login failed:", result.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  const logout = async () => {
    try {
      const res = await fetch(`${URL}/user/logout-admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const result = await res.json();
      console.log(result);

      if (result.statusCode === 200) {
        setIsAuthenticated(false);
      } else {
        console.error("Logout failed:", result.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ login, isAuthenticated, URL, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
