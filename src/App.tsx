import React, { useEffect, useState } from "react";
import Routers from "./Routes";
import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import "./styles/_base.scss";
import { useDispatch } from "react-redux";
import { fetchCountries } from "./redux/actions";
import Appbar from "./components/Appbar/Appbar";
import Sidebar from "./components/Sidebar/Sidebar";

//create material UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#f2aa26",
      dark: "#f09c01",
    },
    secondary: {
      main: "#11cb5f",
    },
    text: {
      primary: "#373585",
      secondary: "#a4a6b3",
    },
    background: {
      default: "#f7f8fc",
    },
  },
  typography: {
    fontFamily: "Poppins, sans- serif",
    fontWeightBold: 700,
    fontWeightMedium: 600,
    fontWeightRegular: 400,
    htmlFontSize: 8,
  },
});

function App() {
  const [drawerState, setDrawerState] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);

  // handle drawer state
  const handleDrawerState = (state: boolean) => {
    setDrawerState(state);
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Appbar drawerState={drawerState} onClick={handleDrawerState} />
        <Sidebar onClick={handleDrawerState} drawerState={drawerState} />
        <Routers />
      </div>
    </ThemeProvider>
  );
}

export default App;
