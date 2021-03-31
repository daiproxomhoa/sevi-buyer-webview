import { createMuiTheme, darken, fade } from "@material-ui/core/styles";
import { PRIMARY, SECONDARY, BLACK_TEXT, GREY_300 } from "./colors";

export const MUI_THEME = createMuiTheme({
  palette: {
    primary: {
      light: fade(PRIMARY, 0.9),
      main: PRIMARY,
      dark: darken(PRIMARY, 0.1),
      contrastText: "#ffffff",
    },
    secondary: {
      light: fade(SECONDARY, 0.9),
      main: SECONDARY,
      dark: darken(SECONDARY, 0.1),
      contrastText: "#ffffff",
    },
    text: {
      primary: BLACK_TEXT,
      secondary: fade(BLACK_TEXT, 0.34),
    },
  },
  typography: {
    htmlFontSize: 14,
    fontSize: 14,
    subtitle1: {
      fontSize: "24px",
      fontWeight: 500,
      lineHeight: "140%",
      letterSpacing: 0,
    },
    subtitle2: {
      fontSize: "18px",
      fontWeight: 500,
      lineHeight: "140%",
      letterSpacing: 0,
    },
    body1: {
      fontSize: "16px",
      lineHeight: "140%",
      fontWeight: "normal",
      letterSpacing: 0,
    },
    body2: {
      fontSize: "14px",
      lineHeight: "140%",
      fontWeight: "normal",
      letterSpacing: 0,
    },
    caption: { fontSize: "12px", lineHeight: "20px", letterSpacing: 0 },
    button: {
      fontSize: "16px",
      textTransform: "none",
      lineHeight: "140%",
      fontWeight: "normal",
      letterSpacing: "0.24px",
    },
  },
  zIndex: {
    modal: 9999,
  },
  overrides: {
    MuiDivider: {
      root: { backgroundColor: GREY_300, margin: undefined },
    },
    MuiButton: {
      root: {
        borderRadius: "12px",
        height: "48px",
        "&$contained:hover": {
          boxShadow: "none",
        },
      },
      sizeSmall: {
        height: "30px",
        borderRadius: "500px",
        fontSize: "14px",
      },
      sizeLarge: {
        boxShadow: "none",
      },
      contained: {
        boxShadow: "none",
      },
      disableElevation: true,
    },
    MuiIconButton: {
      root: {},
    },
    MuiAppBar: {
      root: {
        padding: "12px 8px 12px 24px",
      },
    },
  },
});
