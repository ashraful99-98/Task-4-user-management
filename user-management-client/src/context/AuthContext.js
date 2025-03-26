import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             // const res = await axios.get("http://localhost:8000/api/users/me",
    //             const API_BASE_URL = "https://user-management-server-liard.vercel.app";
    //             const res = await axios.get(`${API_BASE_URL}/api/users/me`,
    //                 // const res = await axios.get("https://user-management-server-liard.vercel.app/api/users/me",
    //                 { withCredentials: true });
    //             setUser(res.data.user);
    //             setIsAuthenticated(true);
    //         } catch (error) {
    //             setUser(null);
    //             setIsAuthenticated(false);
    //         }
    //     };
    //     fetchUser();
    // }, []);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const API_BASE_URL = "https://user-management-server-liard.vercel.app";
                const token = localStorage.getItem("token"); // Retrieve token if stored

                const res = await axios.get(`${API_BASE_URL}/api/users/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true
                });

                setUser(res.data.user);
                setIsAuthenticated(true);
            } catch (error) {
                setUser(null);
                setIsAuthenticated(false);
            }
        };
        fetchUser();
    }, []);


    // const login = async (email, password) => {
    //     try {
    //         // const res = await axios.post("http://localhost:8000/api/auth/login", 
    //         const API_BASE_URL = "https://user-management-server-liard.vercel.app";
    //         const res = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password }, { withCredentials: true });
    //         setUser(res.data.user);
    //         setIsAuthenticated(true);
    //         return { success: true, message: res.data.message };
    //     } catch (error) {
    //         return { success: false, message: error.response?.data?.message || "Login failed" };
    //     }
    // };

    const login = async (email, password) => {
        try {
            const API_BASE_URL = "https://user-management-server-liard.vercel.app";
            const res = await axios.post(`${API_BASE_URL}/api/auth/login`,
                { email, password },
                { withCredentials: true } // Send cookies
            );

            localStorage.setItem("token", res.data.token); // Store token after login
            setUser(res.data.user);
            setIsAuthenticated(true);
            return { success: true, message: res.data.message };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Login failed" };
        }
    };


    // const logout = async () => {
    //     setLoading(true);
    //     try {
    //         // await axios.post("http://localhost:8000/api/auth/logout", {}, 
    //         const API_BASE_URL = "https://user-management-server-liard.vercel.app";
    //         await axios.post(`${API_BASE_URL}/api/auth/logout`, {}, { withCredentials: true });
    //         setUser(null);
    //         setIsAuthenticated(false);
    //     } catch (error) {
    //         console.error("Logout failed:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const logout = async () => {
        setLoading(true);
        try {
            const API_BASE_URL = "https://user-management-server-liard.vercel.app";
            await axios.post(`${API_BASE_URL}/api/auth/logout`, {}, { withCredentials: true });

            localStorage.removeItem("token"); // Remove token after logout
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