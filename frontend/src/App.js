import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Register } from "./pages/Auth/Register";
import { Login } from "./pages/Auth/Login";
import { Homepage } from "./pages/Homepage";
import { UserHomepage } from "./pages/UserHomepage";
import { AdminHomepage } from "./pages/AdminHomepage";
import { CreateQuiz } from "./pages/CreateQuiz";
import { Quizpage } from "./pages/Quizpage";
import { Quiz } from "./pages/Quiz";
import { Scorepage } from "./pages/Scorepage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/:id/login" element={<Login />} />
          <Route exact path="/:id/register" element={<Register />} />
          <Route exact path="/UserHomepage" element={<UserHomepage />} />
          <Route exact path="/AdminHomepage" element={<AdminHomepage />} />
          <Route exact path="/AdminHomepage" element={<AdminHomepage />} />
          <Route exact path="/Quiz/:id" element={<Quizpage />} />
          <Route exact path="/Quiz" element={<Quiz />} />
          <Route exact path="/Scores" element={<Scorepage />} />
          <Route
            exact
            path="/AdminHomepage/createQuiz"
            element={<CreateQuiz />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
