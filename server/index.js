const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");
const Quiz = require("./models/Quiz");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { isValidObjectId } = require("mongoose");

// Create Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB database
mongoose.connect(
  "mongodb+srv://punitgoyal106:J0vpHUcK5PD1Aju6@cluster0.vi6yhui.mongodb.net/",
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const salt = bcrypt.genSaltSync(10);
const secret = "fajhjjjsfahuikjakh";


//post request to send the database of the user after successful signup to the database.
app.post("/signup", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  console.log(req.body)
  try {

    const userDoc = await User.create({
      firstname,
      lastname,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

//post request to match the user credentials from the database for the existing user.
app.post("/login", async (req, res) => {
  const { firstname, email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email });
    if (!userDoc) {
      return res.status(400).json({ message: "User not found" });
    }

    const passOk = bcrypt.compareSync(password, userDoc.password);
    const firstNameOk = userDoc.firstname === firstname;

    if (passOk && firstNameOk) {
      jwt.sign({ firstname, id: userDoc._id }, secret, {}, (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          id: userDoc._id,
          firstname, 
        });
      });
    } else {
      res.status(400).json({ message: "Wrong credentials" });
    }
  } catch (e) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
});

// Create Quiz Route to post the newly created quiz to the database.
app.post("/api/quizzes", async (req, res) => {
  try {
    const { name, questions } = req.body;
    const quiz = new Quiz({ name, questions });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (e) {
    res.status(400).json({ message: e.message });
  } 
});

// Fetch All Quizzes Route
app.get("/api/quizzes", async (req, res) => {
  try {
    const quizzes = await Quiz.find({}, 'name'); // Fetch only the quiz names
    res.json(quizzes);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

app.get("/api/quizzes/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Define a fallback error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
