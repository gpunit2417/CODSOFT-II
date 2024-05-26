const mongoose = require("mongoose");

//defined the structure of quiz model to store into database.
const quizSchema = new mongoose.Schema({
  name: { type: String, required: true },
  questions: [
    {
      question: { type: String, required: true },
      options: [{ type: String, required: true }],
      answer: { type: String, required: true },
    },
  ],
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
