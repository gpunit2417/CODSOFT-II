import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Question from "./Question";

export default function Play() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const { quizId } = useParams();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/quizzes/${quizId}`
        );
        if (!response.ok) {
          throw new Error("There was an error fetching the questions!");
        }
        const data = await response.json();
        console.log("Fetched quiz:", data);
        setQuestions(data.questions); // Set the questions state
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [quizId]);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert("No more questions. You can submit the quiz now.");
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      alert("You are on the first question!");
    }
  };

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestionIndex]: answer });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const score = questions.reduce((total, question, index) => {
      return total + (question.answer === answers[index] ? 1 : 0);
    }, 0);

    localStorage.setItem(
      "quizResult",
      JSON.stringify({ score, total: questions.length })
    );

    window.location.href = "/result";
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)",
          margin: '0 0 11px 0'
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "2rem",
          margin: "80px 0 20px 0",
        }}
      >
        Quiz Questions
      </h1>
      {questions.length > 0 ? (
        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            margin: "20px 0 60px 0",
            width: "50vw",
            display: "inline-block",
            borderRadius: ".5rem",
            background: "linear-gradient(to right, #005aa7, #fffde4)",
          }}
        >
          <Question
            question={questions[currentQuestionIndex].question}
            options={questions[currentQuestionIndex].options}
            onNext={
              currentQuestionIndex < questions.length - 1 ? handleNext : null
            }
            onPrevious={currentQuestionIndex > 0 ? handlePrevious : null}
            onAnswer={handleAnswer}
          />
          {currentQuestionIndex > 0 && (
            <button
              className="btn btn-primary"
              onClick={handlePrevious}
              style={{ margin: "10px" }}
            >
              Previous
            </button>
          )}
          {currentQuestionIndex < questions.length - 1 && (
            <button
              className="btn btn-primary"
              onClick={handleNext}
              style={{ margin: "10px" }}
            >
              Next
            </button>
          )}
          {currentQuestionIndex === questions.length - 1 && (
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit Quiz
            </button>
          )}
        </div>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
}
