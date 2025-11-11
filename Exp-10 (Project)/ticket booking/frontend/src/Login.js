import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/user/login", {
        email,
        password,
      });

      if (res.data === "Login Successful!") {
        alert("Login Successful!");
        props.onLoginSuccess(); // ✅ open movies page
      } else {
        alert(res.data);
      }
    } catch (err) {
      console.error(err);
      alert("Error logging in! Check backend or database connection.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Welcome Back</h2>
      <p>Login to book your tickets</p>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      <p className="switch-text">
        Don't have an account?{" "}
        <span className="switch-link" onClick={props.onSwitch}>
          Register
        </span>
      </p>
    </div>
  );
}

export default Login;