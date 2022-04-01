import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Menu } from "./menus/Menu";
import { Quiz } from "./quizzes/Quiz";
import { Setting } from "./settings/Setting";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
