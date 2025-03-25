import { Spinner } from "react-bootstrap";

const Loader = ({ size = "sm", message = "Loading..." }) => {
    return (
        <div className="d-flex align-items-center">
            <Spinner as="span" animation="border" size={size} role="status" aria-hidden="true" />
            <span className="ms-2">{message}</span>
        </div>
    );
};

export default Loader;
