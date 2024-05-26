import React, { useState } from "react";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  //handles the creation of quiz before signup and login
  const handleCreateQuiz = () => {
    if (!isLoggedIn) {
      alert("Please login to create a quiz!");
      return;
    }
    window.location.href = "/create";
  };

  //handles the play of quiz before login
  const handlePlayQuiz = () => {
    if (!isLoggedIn) {
      alert("Please login to play a quiz!");
      return;
    }
    window.location.href = "/select-quiz";
  };

  return (
    <div
      style={{
        background: "linear-gradient(to right, #1fa2ff, #12d8fa, #a6ffcb)",
        height: "90vh",
      }}
    >
      <h1 style={{ margin: "60px 0 0 0", color: "white" }}>
        <i>Hey there, Welcome to the Quiz Game</i>
      </h1>
      <div
        className="card"
        style={{
          background: "linear-gradient(to right, #0cebeb, #20e3b2, #29ffc6)",
          padding: "20px",
          borderRadius: "5px",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: '20vw', 
          margin: '100px 0 0 500px'
        }}
      >
        <button
          onClick={handleCreateQuiz}
          className="btn btn-primary"
          style={{
            backgroundColor: "#1fa2ff",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
            margin: "30px 0 30px 0"
          }}
        >
          Create Quiz
        </button>
        <button
          onClick={handlePlayQuiz}
          className="btn btn-primary"
          style={{
            backgroundColor: "#1fa2ff",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
            margin: "30px 0 30px 0"
          }}
        >
          Play Quiz
        </button>
      </div>
    </div>
  );
}
