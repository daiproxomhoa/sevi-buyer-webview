import {
  BottomNavigation as MUIBottomNavigation,
  BottomNavigationAction,
  makeStyles,
  Theme,
} from "@material-ui/core";
import AssistantIcon from "@material-ui/icons/Assistant";
import ListIcon from "@material-ui/icons/List";
import PersonIcon from "@material-ui/icons/Person";
import SearchIcon from "@material-ui/icons/Search";
import { withStyles } from "@material-ui/styles";
import { push, replace } from "connected-react-router";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { ROUTES } from "../../../configs/routes";

const useStyles = makeStyles({
  root: {
    position: "sticky",
    bottom: 24,
    height: 48,
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
    borderRadius: 500,
    margin: "0 22px",
    overflow: "hidden",
  },
  selected: {
    paddingTop: 0,
  },
});

const CustomBottomNavigationAction = withStyles((theme: Theme) => ({
  root: {
    minWidth: "40px",
    transition: "color 250ms",
    "&$selected": {
      padding: "0 16px",
      "& .MuiBottomNavigationAction-wrapper": {
        height: "100%",
        borderTop: `3px solid ${theme.palette.primary.main}`,
      },
    },
    "&$iconOnly": {
      padding: "0 16px",
    },
  },
  selected: {},
  iconOnly: {},
  wrapper: {},
}))(BottomNavigationAction);

interface IBottomNavigationProps {}

const BottomNavigation: React.FunctionComponent<IBottomNavigationProps> = (
  props
) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const classes = useStyles();

  const routerArr = React.useMemo(
    () => [ROUTES.search, ROUTES.request, ROUTES.rating, ROUTES.profile],
    []
  );

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    const currentIndex = routerArr.indexOf(location.pathname);
    const nextIndex = routerArr.indexOf(newValue);

    currentIndex > nextIndex
      ? dispatch(replace(newValue))
      : dispatch(push(newValue));
  };

  return (
    <MUIBottomNavigation
      value={location.pathname}
      onChange={handleChange}
      className={classes.root}
    >
      <CustomBottomNavigationAction
        style={{ paddingLeft: "22px" }}
        value={ROUTES.search}
        icon={<SearchIcon style={{ width: "24px" }} />}
      />
      <CustomBottomNavigationAction
        value={ROUTES.request}
        icon={<ListIcon style={{ width: "24px" }} />}
      />
      <CustomBottomNavigationAction
        value={ROUTES.rating}
        icon={<AssistantIcon style={{ width: "24px" }} />}
      />
      <CustomBottomNavigationAction
        style={{ paddingRight: "22px" }}
        value={ROUTES.profile}
        icon={<PersonIcon style={{ width: "24px" }} />}
      />
    </MUIBottomNavigation>
  );
};

export default BottomNavigation;
