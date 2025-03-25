import React from "react";
import { Carousel, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Slider.css";

// Import Images
import img1 from "../images/2.avif";
import img2 from "../images/5.avif";
import img3 from "../images/4.avif";

const slides = [
    {
        image: img1,
        title: "User Management",
        description:
            "Manage users effectively with secure authentication, access control, and real-time monitoring.",
    },
    {
        image: img2,
        title: "Data Security",
        description:
            "Ensure high-level security with encrypted transactions and protected user data.",
    },
    {
        image: img3,
        title: "Performance Optimization",
        description:
            "Optimize your platform with real-time analytics and seamless integration.",
    },
];

const Slider = () => {
    return (
        <div className="slider-section">
            <Container className="slider-container">
                <Carousel>
                    {slides.map((slide, index) => (
                        <Carousel.Item key={index}>
                            <div
                                className="slider-img"
                                style={{ backgroundImage: `url(${slide.image})` }}
                            >
                                <div className="slider-content">
                                    <h2>{slide.title}</h2>
                                    <p>{slide.description}</p>
                                    <Button variant="dark">See More</Button>
                                </div>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Container>
        </div>
    );
};

export default Slider;
