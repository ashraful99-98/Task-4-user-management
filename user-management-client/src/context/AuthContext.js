import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {

                const API_URL = process.env.VERCEL_APP_URL;
                const res = await axios.get(`${API_URL}/api/users/me`, { withCredentials: true });
                // const res = await axios.get("https://users-management-server-nh6yhtge1-kamran99-s-projects.vercel.app/api/users/me", { withCredentials: true });
                setUser(res.data.user);
                setIsAuthenticated(true);
            } catch (error) {
                setUser(null);
                setIsAuthenticated(false);
            }
        };
        fetchUser();
    }, []);

    const login = async (email, password) => {
        try {

            // const res = await axios.get(`${API_URL}/api/auth/login`, { withCredentials: true });
            const API_URL = process.env.VERCEL_APP_URL;
            const res = await axios.get(`${API_URL}/api/auth/login`, { email, password }, { withCredentials: true });
            setUser(res.data.user);
            setIsAuthenticated(true);
            return { success: true, message: res.data.message };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Login failed" };
        }
    };

    const logout = async () => {
        setLoading(true);
        try {

            const API_URL = process.env.VERCEL_APP_URL;
            await axios.get(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });

            // await axios.post("http://localhost:8000/api/auth/logout", {}, { withCredentials: true });

            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider;
