import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelpView, PracticeView, PlayView, NotFoundView } from "./views";
import { UserContextProvider } from "./common/UserContext";
import { ModelContextProvider } from "./common/ModelContext";

function App() {
  return (
    <UserContextProvider>
      <ModelContextProvider>
        <BrowserRouter>
          <Header />
          <AppRoutes />
        </BrowserRouter>
      </ModelContextProvider>
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
