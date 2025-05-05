import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Exchange from "./pages/Exchange";
import "./App.css";
import NotFound from "./pages/NotFound";
import ErrorPage from "./pages/ErrorPage";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppContent darkMode={darkMode} setDarkMode={setDarkMode} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

function AppContent({ darkMode, setDarkMode }) {
  const location = useLocation(); // Get the current location

  return (
    <>
      {/* Render Header only if the current path is not /error */}
      {location.pathname !== "/error" && (
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/exchange" element={<Exchange />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </>
  );
}
