import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function Register(props) {
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/user/register", user);
      alert(res.data);
      setUser({ name: "", email: "", password: "" });
    } catch (err) {
      console.error(err);
      alert("Error registering! Check backend connection.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>
      <p>Register to start booking</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
        />
        <button type="submit">Register</button>
      </form>

      <p className="switch-text">
        Already have an account?{" "}
        <span className="switch-link" onClick={props.onSwitch}>
          Login
        </span>
      </p>
    </div>
  );
}

export default Register;