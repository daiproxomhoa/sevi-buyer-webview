import { Tab, Tabs, Theme } from "@material-ui/core";
import { createStyles, withStyles } from "@material-ui/styles";
import React from "react";
import { BACKGROUND, LIGHT_GREY } from "../../../configs/colors";

export const CustomTabs = withStyles({
  root: {
    borderBottom: `1px solid ${LIGHT_GREY}`,
    margin: "0 24px",
    padding: 0,
    position: "sticky",
    top: 0,
    background: BACKGROUND,
    zIndex: 1,
  },
  indicator: {
    height: "1px",
  },
})(Tabs);

interface StyledTabProps {
  label: string;
}

export const CustomTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      fontSize: theme.typography.body1.fontSize,
      paddingTop: 24,
      "&$selected": {
        color: theme.palette.text.primary,
      },
    },
    selected: {},
  })
)((props: StyledTabProps) => <Tab disableRipple {...props} />);
