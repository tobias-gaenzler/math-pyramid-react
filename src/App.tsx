import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFoundView from "./views/NotFoundView";
import HelpView from "./views/HelpView";
import PracticeView from "./views/PracticeView";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRoutes />
    </BrowserRouter>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HelpView />} />
      <Route path="/practice" element={<PracticeView />} />
      <Route path="*" element={<NotFoundView />} />
    </Routes>
  );
}

export default App;
