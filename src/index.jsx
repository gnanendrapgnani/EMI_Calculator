import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import {
  CurrencyProvider,
  ThemeContextProvider,
  useThemeContext,
} from "./context/context";
import ErrorBoundary from "./pages/ErrorBoundary";

const Root = () => {
  const { darkMode } = useThemeContext();

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CurrencyProvider>
      <ThemeContextProvider>
        <ErrorBoundary>
          <Root />
        </ErrorBoundary>
      </ThemeContextProvider>
    </CurrencyProvider>
  </React.StrictMode>
);
