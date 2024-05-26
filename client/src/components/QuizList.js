import React, { useEffect, useState } from "react";

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/quizzes');
        if (!response.ok) {
          throw new Error("There was an error fetching the quizzes!");
        }
        const data = await response.json();
        setQuizzes(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuizzes();
  }, []);

  const handleQuizSelect = (quizId) => {
    window.location.href = `/play/${quizId}`
  };

  return (
    <div style={{ margin: '0 0 145px 0' }}>
      <h1 style={{ margin: "100px 0 30px 0" }}>Select a Quiz</h1>
      <div>
        {quizzes.map((quiz) => (
          <div
            key={quiz._id}
            style={{
              margin: "20px 10px 20px 40px",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              cursor: "pointer",
              width: '40vw',
              display: 'inline-block',
              overflow: 'hidden'
            }}
            onClick={() => handleQuizSelect(quiz._id)}
          >
            <h4>{quiz.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
