import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelpView, PracticeView, PlayView, NotFoundView } from "./views";
import { UserContextProvider } from "./common/UserContext";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Header />
        <AppRoutes />
      </BrowserRouter>
    </UserContextProvider>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HelpView />} />
      <Route path="/practice" element={<PracticeView />} />
      <Route path="/play" element={<PlayView />} />
      <Route path="*" element={<NotFoundView />} />
    </Routes>
  );
}

export default App;
