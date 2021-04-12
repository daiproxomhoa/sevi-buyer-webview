import {
  Button,
  fade,
  ListItem,
  Popover,
  Theme,
  Typography,
  withStyles,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import React from "react";
import { FormattedMessage } from "react-intl";
import { GREY_300, LIGHT_GREY, PRIMARY } from "../../../../configs/colors";
import { some } from "../../../common/constants";
import { IAddresses } from "../../../profile/model";
import { ISellerSearchFilter } from "../../model";

const CustomPopover = withStyles((theme: Theme) => ({
  root: {
    left: 24,
  },
  paper: {
    marginTop: 3,
    borderRadius: 12,
    maxWidth: "calc(100% - 48px)",
  },
}))(Popover);

interface Props {
  filter: ISellerSearchFilter;
  profile?: some;
  setFilter(data: ISellerSearchFilter): void;
}

const SelectAddress = (props: Props) => {
  const { filter, profile, setFilter } = props;

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;

  return (
    <>
      <Typography variant="subtitle2">
        <FormattedMessage id="search.distance" />
      </Typography>
      <div
        style={{
          display: "flex",
          padding: "16px 0",
          alignItems: "center",
        }}
      >
        <div
          style={{
            borderRadius: "50%",
            padding: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: fade(PRIMARY, 0.1),
            flexShrink: 0,
            marginRight: "12px",
          }}
        >
          <RadioButtonCheckedIcon
            color="primary"
            style={{ fontSize: "20px" }}
          />
        </div>

        <Button
          fullWidth
          style={{
            backgroundColor: LIGHT_GREY,
            justifyContent: "flex-start",
            padding: "6px 16px",
          }}
          onClick={(event) => setAnchorEl(event.currentTarget)}
          endIcon={
            <ChevronLeftIcon
              fontSize="small"
              style={{
                transform: "rotate(270deg)",
              }}
            />
          }
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
              {filter.address.name}
            </Typography>
            <Typography
              variant="body2"
              style={{
                width: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                textAlign: "start",
              }}
            >
              {filter.address.address.formattedAddress}
            </Typography>
          </div>
        </Button>
      </div>

      <CustomPopover
        id={id}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          style: {
            width: "100%",
          },
        }}
        elevation={1}
        marginThreshold={24}
      >
        {profile?.addresses.map((one: some, index: number) => (
          <ListItem
            key={JSON.stringify(one)}
            button
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "12px 16px",
              borderTop: index ? `1px solid ${GREY_300}` : "none",
            }}
            onClick={() => {
              setFilter({ ...filter, address: one as IAddresses });
              handleClose();
            }}
          >
            <Typography variant="caption" color="textSecondary">
              {one?.name}
            </Typography>
            <Typography
              variant="body2"
              style={{
                width: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {one?.address?.formattedAddress}
            </Typography>
          </ListItem>
        ))}
      </CustomPopover>
    </>
  );
};

export default SelectAddress;
