import { Link } from "react-router-dom";
import "./Announcement.css";

const Announcement = () => {
  return (
    <div className="announcement">
      <p>
        Sign up and get 20% off your first order.{" "}
        <Link to="/login" style={{ color: "#fff", textDecoration: "underline", fontWeight: "600" }}>
          Sign Up Now
        </Link>
      </p>
    </div>
  );
};

export default Announcement;