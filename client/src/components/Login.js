import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  //fetched the data of the user and matches the credentials
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstname, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Login successful
        localStorage.setItem("token", data.token);
        history.push("/"); // Redirect to dashboard after login
        window.location.reload();
      } else {
        // Login failed
        setError(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again later.");
      // alert("")
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2 style={{ margin: "100px 0 10px 0", textAlign: "center" }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div
          style={{ display: "flex", flexDirection: "column", margin: "20px 0" }}
        >
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            required
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", margin: "20px 0" }}
        >
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", margin: "20px 0" }}
        >
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            borderRadius: "5px",
            margin: "0 0 30px 0",
          }}
        >
          Login
        </button>
      </form>
      {error && <div style={{ color: "red", margin: "10px 0" }}>{error}</div>}
      <h4>Don't have an account?</h4>
      <a href="/signup">SignUp</a>
    </div>
  );
};

export default Login;
