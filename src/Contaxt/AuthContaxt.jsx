import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children})=>{

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const URL = 'http://localhost:5000/api/v1'

    const login = async(loginData)=>{

        console.log(loginData);
        
        const res = await fetch(`${URL}/user/login`,{
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify(loginData),
            credentials:"include",
        })
        const result =await res.json()
        console.log(result);
        if(result.statusCode === 200){
            setIsAuthenticated(true)
            localStorage.setItem("isAuth","true")
        }
        else{
            console.log(Error);
            
        }
        
    }
    const logout = async()=>{
       try {
         const res = await fetch(`${URL}/user/logout`,{
             method:"POST",
             headers: { "Content-Type": "application/json" },
             credentials:"include",
         })
         const result =await res.json()
         console.log(result);
         if (result.statusCode === 200) {
             console.log("Removing localStorage item before logout...");
             localStorage.removeItem("isAuth");
             console.log("isAuth after logout:", localStorage.getItem("isAuth"));
             setIsAuthenticated(false); // This updates your application state
         } else {
             console.error("Logout failed:", result.message || "Unknown error");
         }
       } catch (error) {
        console.error("Error during logout:", error.message);
       }
    }

   return(
    <AuthContext.Provider value={{ login, isAuthenticated, URL ,logout }}>
            {children}
    </AuthContext.Provider>
   )
}

export const useAuth = ()=> useContext(AuthContext)