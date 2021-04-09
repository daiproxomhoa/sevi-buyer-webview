import { Button, Menu, MenuItem, Typography } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import React from "react";
import { FormattedMessage } from "react-intl";
import { GREY_300, LIGHT_GREY } from "../../../../configs/colors";
import { sortByFilter } from "../../constants";
import { ISellerSearchFilter } from "../../model";

interface Props {
  filter: ISellerSearchFilter;
  setFilter(filter: ISellerSearchFilter): void;
}

const MenuSortBy = (props: Props) => {
  const { filter, setFilter } = props;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        fullWidth
        style={{
          marginTop: "16px",
          backgroundColor: LIGHT_GREY,
          justifyContent: "flex-start",
          padding: "6px 32px 6px 16px",
          height: "56px",
        }}
        size="large"
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <Typography variant="caption" color="textSecondary">
            <FormattedMessage id="search.filter.sortBy" />
          </Typography>
          <Typography
            variant="body2"
            style={{
              textAlign: "start",
              width: "100%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <FormattedMessage id={`search.filter.${filter.sortBy}`} />
          </Typography>
        </div>

        <ChevronLeftIcon
          fontSize="small"
          style={{
            transform: "rotate(270deg)",
          }}
        />
      </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "100%",
          },
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        elevation={1}
      >
        {sortByFilter.map((one, index) => (
          <MenuItem
            selected={one === filter.sortBy}
            onClick={() => {
              setFilter({ ...filter, sortBy: one });
              handleClose();
            }}
            key={one}
            style={{
              borderTop: !!index ? `1px solid ${GREY_300}` : "none",
            }}
          >
            <Typography
              variant="body2"
              style={{
                textAlign: "start",
                width: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <FormattedMessage id={`search.filter.${one}`} />
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default MenuSortBy;
