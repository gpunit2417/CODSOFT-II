import React, { useState } from "react";

export default function CreateQuiz() {
  const [quizName, setQuizName] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState('');
  const [questions, setQuestions] = useState([]);
  const [isQuestionFormVisible, setIsQuestionFormVisible] = useState(false);

  const handleQuizNameChange = (event) => {
    setQuizName(event.target.value);
  };

  const handleNumberOfQuestionsChange = (event) => {
    setNumberOfQuestions(parseInt(event.target.value, 10)); // Ensure number input
  };

  const handleCreateQuestionsClick = () => {
    const newQuestions = Array.from({ length: numberOfQuestions }, () => ({
      question: "",
      options: ["", "", "", ""],
      answer: "",
    }));
    setQuestions(newQuestions);
    setIsQuestionFormVisible(true);
  };

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].question = event.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].answer = event.target.value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/quizzes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: quizName,
          questions,
        }),
      });
      if (!response.ok) {
        throw new Error("There was an error creating the quiz!");
      }
      const data = await response.json();
      console.log(data);
      alert("Quiz Created Successfully.")

      setQuizName("");
      setNumberOfQuestions(0);
      setQuestions([]);
      setIsQuestionFormVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 style={{ margin: "100px 0 20px 0" }}>Create Quiz</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", margin: "20px 0" }}
        >
          <label htmlFor="quizName">Quiz Name:</label>
          <input
            type="text"
            id="quizName"
            value={quizName}
            onChange={handleQuizNameChange}
          />
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", margin: "20px 0" }}
        >
          <label htmlFor="numberOfQuestions">Number of Questions:</label>
          <input
            type="number"
            id="numberOfQuestions"
            value={numberOfQuestions}
            onChange={handleNumberOfQuestionsChange}
          />
        </div>
        <button
          type="button"
          disabled={!quizName || !numberOfQuestions}
          onClick={handleCreateQuestionsClick}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            borderRadius: "5px",
            margin: "10px 0 132px 0",
          }}
        >
          Create Questions
        </button>

        {isQuestionFormVisible && (
          <div>
            {questions.map((q, index) => (
              <div key={index} style={{ margin: "20px 0" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "10px 0",
                  }}
                >
                  <label htmlFor={`question-${index}`}>
                    Question {index + 1}:
                  </label>
                  <input
                    type="text"
                    id={`question-${index}`}
                    value={q.question}
                    onChange={(event) => handleQuestionChange(index, event)}
                    required
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "10px 0",
                  }}
                >
                  {q.options.map((option, oIndex) => (
                    <div key={oIndex} style={{ margin: "5px 0" }}>
                      <label htmlFor={`option-${index}-${oIndex}`}>
                        Option {oIndex + 1}:
                      </label>
                      <input
                        type="text"
                        id={`option-${index}-${oIndex}`}
                        value={option}
                        onChange={(event) =>
                          handleOptionChange(index, oIndex, event)
                        }
                        required
                      />
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "10px 0",
                  }}
                >
                  <label htmlFor={`answer-${index}`}>Answer {index + 1}:</label>
                  <input
                    type="text"
                    id={`answer-${index}`}
                    value={q.answer}
                    onChange={(event) => handleAnswerChange(index, event)}
                    required
                  />
                </div>
              </div>
            ))}
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                backgroundColor: "#4CAF50",
                color: "white",
                borderRadius: "5px",
                margin: "20px 0",
              }}
            >
              Submit Questions
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
