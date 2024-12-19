import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "/barakio.css"; // Ensure this matches the Signup's styling

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${apiUrl}/users/login`, { email, password })
      .then((result) => {
        if (result.data.token) {
          sessionStorage.setItem("token", result.data.token);
          sessionStorage.setItem("user", JSON.stringify(result.data.user));
          sessionStorage.setItem("_id", result.data.user._id);
          navigate("../tasks");
        }
      })
      .catch((err) => {
        console.error("Login Error:", err);
        alert("Login failed. Please check your email and password.");
      });
  };

  return (
    <div className="signup-box">
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit}>
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
          <button type="submit" className="login-btn">
            Login
          </button>
        </div>
      </form>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <a href="/register" id="forgot-password">
          Don't have an account? Sign Up
        </a>
      </div>
    </div>
  );
}

export default Login;
