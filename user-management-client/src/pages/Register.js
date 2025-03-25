import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import registerImg from "../images/register-preview.png";
import "./Register.css";
import { motion } from "framer-motion";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState({ type: "", text: "" });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const API_URL = process.env.VERCEL_APP_URL;
            await axios.post(`${API_URL}/api/auth/register`, { name, email, password });

            // const response = await axios.post("http://localhost:8000/api/auth/register", {
            //     name,
            //     email,
            //     password
            // });
            setMessage({ type: "success", text: "Registration successful! Redirecting to login..." });

            setName("");
            setEmail("");
            setPassword("");

            // Redirect login page
            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (error) {
            console.error("Registration failed:", error.response?.data?.message || error.message);


            setMessage({ type: "error", text: error.response?.data?.message || "Registration failed. Please try again." });
        }
    };

    return (
        <Container fluid className="d-flex vh-100 align-items-center justify-content-center bg-light-gray register-form">
            <Row className="w-100 d-flex align-items-center justify-content-center">
                {/* Form Section */}
                <Col xs={12} md={6} lg={5} className="d-flex align-items-center justify-content-center">
                    <Card className="shadow-lg p-4 w-100" style={{ maxWidth: "470px" }}>
                        <Card.Body>
                            <h2 className="text-center mb-4">Register</h2>
                            {message.text && (
                                <div className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"} text-center`}>
                                    {message.text}
                                </div>
                            )}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="success" type="submit" className="w-100">
                                    Register
                                </Button>
                            </Form>
                            <div className="text-center mt-3">
                                Already have an account? <Link to="/login" className="small-link">Login</Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Animated Image Section */}
                <Col xs={12} md={6} lg={5} className="d-flex align-items-center justify-content-center motion-image">
                    <motion.img
                        src={registerImg}
                        alt="Register"
                        className="img-fluid moving-image"
                        style={{ maxWidth: "80%", height: "auto", position: "relative" }}
                        animate={{
                            x: [0, 30, -30, 20, -20, 10, -10, 0],  // Moves within a limited area (left-right)
                            y: [0, -20, 20, -15, 15, -10, 10, 0]   // Moves within a limited area (top-bottom)
                        }}
                        transition={{
                            duration: 10, // Smooth, slow movement
                            repeat: Infinity,
                            repeatType: "mirror",
                            ease: "easeInOut"
                        }}
                        whileHover={{
                            scale: 1.1, // Zoom in when hovered
                            transition: { duration: 0.3, ease: "easeInOut" }
                        }}
                    />
                </Col>
            </Row>
        </Container>


    );
};
export default Register;
