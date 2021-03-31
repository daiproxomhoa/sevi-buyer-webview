import { fade, IconButton } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { BACKGROUND, BLACK } from "../../../configs/colors";

export const CssIconButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: 8,
    lineHeight: 1.5,
    marginRight: 12,
    backgroundColor: fade(BLACK, 0.05),
    "&:hover": {
      boxShadow: "none",
      backgroundColor: fade(BLACK, 0.05),
    },
    "&:active": {
      backgroundColor: fade(BLACK, 0.05),
    },
    "&:focus": {
      backgroundColor: fade(BLACK, 0.05),
    },
  },
})(IconButton);

export const WhiteIconButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: 8,
    lineHeight: 1.5,
    color: BACKGROUND,
    backgroundColor: fade(BACKGROUND, 0.2),
    "&:hover": {
      boxShadow: "none",
      backgroundColor: fade(BACKGROUND, 0.2),
    },
    "&:active": {
      backgroundColor: fade(BACKGROUND, 0.2),
    },
    "&:focus": {
      backgroundColor: fade(BACKGROUND, 0.2),
    },
  },
})(IconButton);
