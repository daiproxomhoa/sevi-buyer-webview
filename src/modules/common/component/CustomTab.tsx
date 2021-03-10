import { Tab, Tabs, Theme } from "@material-ui/core";
import { createStyles, withStyles } from "@material-ui/styles";
import React from "react";
import { LIGHT_GREY } from "../../../configs/colors";

export const CustomTabs = withStyles({
  root: {
    borderBottom: `1px solid ${LIGHT_GREY}`,
    margin: "0 24px",
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
      paddingTop: 30,
      "&$selected": {
        color: theme.palette.text.primary,
      },
    },
    selected: {},
  })
)((props: StyledTabProps) => <Tab disableRipple {...props} />);
