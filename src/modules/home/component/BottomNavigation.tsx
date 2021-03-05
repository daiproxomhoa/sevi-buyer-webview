import {
  makeStyles,
  BottomNavigation as MUIBottomNavigation,
  BottomNavigationAction,
  Theme,
} from "@material-ui/core";
import * as React from "react";
import FolderIcon from "@material-ui/icons/Folder";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { withStyles } from "@material-ui/styles";
import { useHistory } from "react-router";
import { ROUTES } from "../../../configs/routes";

const useStyles = makeStyles({
  root: {
    position: "sticky",
    bottom: 24,
    zIndex: 10000,
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

  const [value, setValue] = React.useState("recents");

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  const isShow = React.useMemo(() => {
    return [ROUTES.search].includes(history.location.pathname);
  }, [history.location.pathname]);

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
        value="recents"
        icon={<RestoreIcon style={{ width: "24px" }} />}
      />
      <CustomBottomNavigationAction
        value="favorites"
        icon={<FavoriteIcon style={{ width: "24px" }} />}
      />
      <CustomBottomNavigationAction
        value="nearby"
        icon={<LocationOnIcon style={{ width: "24px" }} />}
      />
      <CustomBottomNavigationAction
        style={{ paddingRight: "22px" }}
        value="folder"
        icon={<FolderIcon style={{ width: "24px" }} />}
      />
    </MUIBottomNavigation>
  );
};

export default BottomNavigation;
