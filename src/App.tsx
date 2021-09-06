import { ThemeProvider } from "@material-ui/core";
import Routes from "./routes/routes";
import MUITheme from "./theme/theme";

function App() {
  return (
    <ThemeProvider theme={MUITheme}>
      <Routes />
    </ThemeProvider>
  );
}

export default App;