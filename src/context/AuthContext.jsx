import { createContext } from "react";
import { useState } from "react";

export const AuthContext = createContext(null);


export default function AuthProvider({ children }) {
    const [user, setUser] = useState(localStorage.getItem("currentUserEmail") ? {email: localStorage.getItem("currentUserEmail")} : null);

    function signUp(email, password){
        const users = JSON.parse(localStorage.getItem("users")) || [];

        if(users.find((user) => user.email === email)){
            return {success: false, error: "Email already exists"};
        }
        const newUser = {email,password};
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUserEmail", email);

        setUser({email});
        return {success: true};
    }

    function login(email,password){
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find((user) => user.email === email && user.password === password);
        if(!user){
            console.log("Invalid email or password");
            return {success: false, error: "Invalid email or password"};
        }
        localStorage.setItem("currentUserEmail", email);
        setUser({email});
        return {success: true};
    }
    function logout(){
        localStorage.removeItem("currentUserEmail");
        setUser(null);
    }
    return (
        <AuthContext.Provider value={{ signUp,user, logout, login }}>{children}</AuthContext.Provider>
    )
}