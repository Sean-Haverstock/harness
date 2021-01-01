import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#002f6c",
      light: "#41579b",
      dark: "#000640",
      contrastText: "#fff",
      bglight: "#f5f5f6",
      bgdark: "#e1e2e1",
    },
    secondary: {
      light: "#e1e2e1",
      main: "#000640",
    },
  },
  typography: {
    fontFamily: [
      "Roboto",
      "Permanent Marker",
      "Pacifico",
      "Dancing Script",
      "cursive",
    ].join(","),
    fontWeightLight: 300,
    subtitle2: {
      fontFamily: "Rokkit",
    },
  },
});

export default theme;
