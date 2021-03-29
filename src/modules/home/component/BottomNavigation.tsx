import {
  makeStyles,
  BottomNavigation as MUIBottomNavigation,
  BottomNavigationAction,
  Theme,
} from "@material-ui/core";
import * as React from "react";
import SearchIcon from "@material-ui/icons/Search";
import ListIcon from "@material-ui/icons/List";
import AssistantIcon from "@material-ui/icons/Assistant";
import PersonIcon from "@material-ui/icons/Person";
import { withStyles } from "@material-ui/styles";
import { useHistory } from "react-router";
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
  const history = useHistory();
  const classes = useStyles();

  const [value, setValue] = React.useState(history.location.pathname);
  const routerArr = React.useMemo(
    () => [ROUTES.search, ROUTES.request, ROUTES.rating, ROUTES.profile],
    []
  );

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    const currentIndex = routerArr.indexOf(history.location.pathname);
    const nextIndex = routerArr.indexOf(newValue);

    currentIndex > nextIndex
      ? history.replace(newValue)
      : history.push(newValue);

    setValue(newValue);
  };

  const isShow = React.useMemo(() => {
    return routerArr.includes(history.location.pathname);
  }, [history.location.pathname, routerArr]);

  if (!isShow) {
    return <></>;
  }

  return (
    <MUIBottomNavigation
      value={value}
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
