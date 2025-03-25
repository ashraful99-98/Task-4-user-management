import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Alert } from "react-bootstrap";
import { FaTrash, FaLock, FaUnlock } from "react-icons/fa";
import "./UserTable.css";

const UserTable = ({ isAuthenticated }) => {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [message, setMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        if (isAuthenticated) {

            // const API_URL = process.env.VERCEL_APP_URL;
            axios.get('https://user-management-server-liard.vercel.app/api/users', { withCredentials: true })

                // axios.get("http://localhost:8000/api/users", { withCredentials: true })
                // axios.post((`${process.env.VERCEL_APP_URL}/api/users`), { withCredentials: true })
                .then((res) => setUsers(res.data.sort((a, b) => new Date(b.lastLogin) - new Date(a.lastLogin))))
                .catch(() => showMessage("error", "Error fetching users"));
        } else {
            setUsers([]);
        }
    }, [isAuthenticated]);


    const showMessage = (type, text) => {
        setMessage({ type, text });

        setTimeout(() => {
            setMessage({ type: "", text: "" });
        }, 3000);
    };


    const toggleSelection = (userId) => {
        setSelectedUsers((prevSelected) =>
            prevSelected.includes(userId)
                ? prevSelected.filter((id) => id !== userId)
                : [...prevSelected, userId]
        );
    };

    // Select/Deselect all users
    const toggleSelectAll = (isChecked) => {
        setSelectedUsers(isChecked ? users.map(user => user._id) : []);
    };

    const handleAction = async (action) => {
        if (selectedUsers.length === 0) {
            showMessage("error", "No users selected!");
            return;
        }

        // Check if selected users are already in the desired state
        if (action === "block" && selectedUsers.every(id => users.find(user => user._id === id)?.isBlocked)) {
            showMessage("error", "Selected users are already blocked!");
            return;
        }

        if (action === "unblock" && selectedUsers.every(id => !users.find(user => user._id === id)?.isBlocked)) {
            showMessage("error", "Selected users are already unblocked!");
            return;
        }

        try {

            // const API_URL = process.env.VERCEL_APP_URL;
            let url = `https://user-management-server-liard.vercel.app/api/users`;
            // let url = `${process.env.VERCEL_APP_URL}/api/users`;
            let method = "PUT";

            if (action === "delete") {
                method = "DELETE";
            } else if (action === "block") {
                url += "/block";
            } else if (action === "unblock") {
                url += "/unblock";
            }

            await axios({
                method,
                url,
                data: { userIds: selectedUsers },
                withCredentials: true
            });

            // Update state to remove deleted users
            if (action === "delete") {
                setUsers(prevUsers => prevUsers.filter(user => !selectedUsers.includes(user._id)));
            } else {
                setUsers(users.map(user =>
                    selectedUsers.includes(user._id)
                        ? { ...user, isBlocked: action === "block" }
                        : user
                ));
            }

            setSelectedUsers([]); // Clear selection after action
            showMessage("success", `Users ${action}ed successfully!`);
        } catch (error) {
            showMessage("error", `Failed to ${action} users`);
        }
    };
    return (
        <div className="container table-item">
            {/* Alert Messages */}
            {message.text && (
                <Alert variant={message.type === "success" ? "success" : "danger"}>
                    {message.text}
                </Alert>
            )}

            {/* Action Buttons */}
            <div className="mb-3">
                <Button variant="warning" className="me-2" onClick={() => handleAction("block")}> <FaLock /> Block </Button>
                <Button variant="success" className="me-2" onClick={() => handleAction("unblock")}> <FaUnlock /> Unblock </Button>
                <Button variant="danger" onClick={() => handleAction("delete")}> <FaTrash /> Delete </Button>
            </div>

            {/* Users Table */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                onChange={(e) => toggleSelectAll(e.target.checked)}
                                checked={selectedUsers.length === users.length && users.length > 0}
                            />
                        </th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Last Seen</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedUsers.includes(user._id)}
                                    onChange={() => toggleSelection(user._id)}
                                />
                            </td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            {/* <td>{user.isBlocked ? "blocked" : "active"}</td> */}
                            <div>
                                <td style={{
                                    backgroundColor: user.isBlocked ? "#f8d7da" : "#d4edda",
                                    color: user.isBlocked ? "#721c24" : "#155724",
                                    padding: "2px 5px",
                                    borderRadius: "5px"
                                }}>
                                    {user.isBlocked ? "blocked" : "active"}
                                </td>
                            </div>

                            <td>{new Date(user.lastLogin).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default UserTable;