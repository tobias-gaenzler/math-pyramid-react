import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelpView, PlayView, NotFoundView } from "./views";
import { ModelContextProvider } from "./common";
import { Header } from "./components";
import { StrictMode } from "react";

function App() {
  return (
    <StrictMode>
        <ModelContextProvider>
          <BrowserRouter>
            <Header />
            <AppRoutes />
          </BrowserRouter>
        </ModelContextProvider>
    </StrictMode>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HelpView />} />
      <Route path="/play" element={<PlayView />} />
      <Route path="*" element={<NotFoundView />} />
    </Routes>
  );
}

export default App;
