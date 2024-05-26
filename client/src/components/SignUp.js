import React, { useState } from "react";

export default function SignUp() {
    const [firstname, setFirstname] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [lastname, setLastname] = useState('');

    //register the user after click of signup button in the database. 
    async function handleSubmit(ev){
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/signup', {
            method: 'POST',
            body: JSON.stringify({firstname, lastname, email, password}),
            headers: {'Content-Type': 'application/json'},
        })

        if(response.status === 200){
            alert('registration successful');
        }
        else{
          const errorData = await response.json();
          alert(`Registration failed: ${errorData.message || 'Unknown error'}`);
        }

        setFirstname("");
        setLastname("");
        setEmail("");
        setPassword("");
  };

  return (
    <div style={{ margin: "100px", textAlign: "center" }}>
      <h1>Sign Up Here</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: "10px",
          maxWidth: "300px",
          margin: "auto",
        }}
      >
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstname}
            onChange={ev => setFirstname(ev.target.value)}
            style={{ width: "100%", padding: "5px" }}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastname}
            onChange={ev => setLastname(ev.target.value)}
            style={{ width: "100%", padding: "5px" }}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={ev => setEmail(ev.target.value)}
            style={{ width: "100%", padding: "5px" }}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={ev => setPassword(ev.target.value)}
            style={{ width: "100%", padding: "5px" }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Sign Up
        </button>
      </form>
      <h4>Already have an account?</h4>
      <a href="/login">Login</a>
    </div>
  );
}
