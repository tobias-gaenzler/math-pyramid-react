import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelpView, PracticeView, PlayView, NotFoundView } from "./views";
import { ModelContextProvider, UserContextProvider } from "./common";
import { Header } from "./components";
import { StrictMode } from "react";

function App() {
  return (
    <StrictMode>
      <UserContextProvider>
        <ModelContextProvider>
          <BrowserRouter>
            <Header />
            <AppRoutes />
          </BrowserRouter>
        </ModelContextProvider>
      </UserContextProvider>
    </StrictMode>
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
