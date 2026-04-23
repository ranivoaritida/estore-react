import { createContext, useState, useContext, useEffect} from "react";
import { loginRequest, refreshRequest } from "../api/authApi";
import { setAccessToken as setAxiosToken } from "../api/axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()  => {
        console.log("App started → trying refresh");
        const initAuth = async () => {
        try {
            const token = await refreshToken();

            if (token) {
                console.log("User restored from refresh token");
            }

        } catch (err) {
            console.log("No active session",err);
        } finally {
            setLoading(false);
        }
    };

    initAuth();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

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

    async function login(email,password){
        try{
            const response = await loginRequest(email,password);
            const token = response.data.token;
            const decode = jwtDecode(token);

            setUser({email: decode.email,name: decode.name, role: decode.role});

            setAccessToken(token);
            setAxiosToken(token);

            return {success: true};
        }
        catch(error){
            console.error("Login error:", error);
            return {success: false, error: "Invalid email or password"};
        }
        
    }
    async function refreshToken(){
        try{
            const res = await refreshRequest();
            if (!res || !res.data) {
                throw new Error("Invalid refresh response");
            }

            const newToken = res.data.token;
            const decode = jwtDecode(newToken);

            setUser({email: decode.email,name: decode.name, role: decode.role});

            setAccessToken(newToken);
            setAxiosToken(newToken);
            console.log("refresh response:", res);
            return newToken;
        }
        catch(error){
            if (error.response?.status === 401) {
                console.log("No session found (normal if not logged in)");
                return null;
            }
            console.error("Error refreshing token:", error);
            logout();
        }
    }
    function logout(){
        setAccessToken(null);
        setAxiosToken(null);
        setUser(null);
    }
    return (
        <AuthContext.Provider value={{ signUp, user,accessToken, logout, login }}>{children}</AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(){
    const context = useContext(AuthContext);
    return context;
}