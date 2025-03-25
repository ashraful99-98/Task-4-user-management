import React, { useContext } from "react";
import UserTable from "../components/UserTable";
import { AuthContext } from "../context/AuthContext";
import Slider from "./Slider";

const Dashboard = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <div className="container">
            <Slider />

            <UserTable isAuthenticated={isAuthenticated} />
        </div>
    );
};

export default Dashboard;
