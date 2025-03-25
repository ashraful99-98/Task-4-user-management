import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Navbar.css";


const NavigationBar = () => {
    const { user, logout } = useContext(AuthContext);

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <Navbar bg="dark" variant="dark" expand="lg"
            className={`custom-navbar ${scrolled ? "navbar-scrolled" : "shadow-lg py-3"}`}
            fixed="top"
        >
            <Container>
                <Navbar.Brand as={Link} to="/" className="nav-brand">
                    User Management
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {user ? (
                            <>
                                <span className="text-white mx-3 fw-bold">Hello, {user.name}</span>
                                <Button
                                    variant="outline-light"
                                    className="logout-btn"
                                    onClick={logout}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login" className="nav-link-custom">
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/register" className="nav-link-custom">
                                    Register
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
