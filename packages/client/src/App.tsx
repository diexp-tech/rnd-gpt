import routes from "@/routes";
import { StoreProvider } from "@/store";
import theme from "@/theme/theme";
import { StyledEngineProvider, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";


function App() {
  const content = useRoutes(routes);

  return (
    <StoreProvider>
      <StyledEngineProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>{content}</ThemeProvider>
        </MuiThemeProvider>
      </StyledEngineProvider>
    </StoreProvider>
  );
}

export default App;
