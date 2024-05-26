import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import HomePage from "./components/HomePage";
import CreateQuiz from "./components/CreateQuiz";
import Play from "./components/Play";
import Result from "./components/Result";
import QuizList from "./components/QuizList"
import About from "./components/About";
import { Footer } from "./components/Footer";


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Route exact path="/" component={HomePage} />
        <Route path='/login' component={Login}/>
        <Route path="/signup" component={SignUp} />
        <Route path="/create" component={CreateQuiz} />
        <Route path="/play/:quizId" component={Play} />
        <Route path="/result" component={Result} />
        <Route path="/select-quiz" component={QuizList} />
        <Route path="/quiz" component={QuizList} />
        <Route path="/about" component={About} />
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
