import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./barakio.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    axios
      .post(`${apiUrl}/users/register`, { name, email, password })
      .then(() => navigate("/login"))
      .catch((err) => console.error("Error:", err));
  };

  return (
    <div className="signup-box">
        <h1>SIGN UP</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <input
            type="text"
            placeholder="Full Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="input-box">
          <button type="submit" className="login-btn">
            Sign Up
          </button>
        </div>
      </form>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <Link to="/login" id="forgot-password">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
