import React, { useState } from "react";

export default function Question({
  question,
  options,
  onAnswer,
}) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    onAnswer(e.target.value);
  };

  return (
    <div>
      <h2>{question}</h2>
      <ul
        style={{
          listStyle: "none",
          padding: "20px 240px",
          fontSize: "1.2rem",
          textAlign: "left",
        }}
      >
        {options.map((option, index) => (
          <li key={index}>
            <label>
              <input
                type="radio"
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
      {/* {onPrevious && <button onClick={onPrevious}>Previous</button>} */}
      {/* {onNext && <button onClick={onNext}>Next</button>} */}
    </div>
  );
}
