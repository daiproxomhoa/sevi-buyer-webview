import { Dialog } from "@material-ui/core";
import React from "react";
import { SlideLeft } from "../../../common/component/elements";
import { CssIconButton } from "../../../common/component/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import RequestForm from "./RequestForm";

interface Props {
  open: boolean;
  onClose(): void;
}

const SellerRequestBox = (props: Props) => {
  const { open, onClose } = props;

  return (
    <Dialog
      open={open}
      TransitionComponent={SlideLeft}
      style={{
        alignItems: "flex-end",
      }}
      fullScreen
      PaperProps={{
        style: {
          margin: 0,
          width: "100%",
        },
      }}
      onBackdropClick={onClose}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 24,
        }}
      >
        <div style={{ padding: "12px 0" }}>
          <CssIconButton onClick={onClose}>
            <ChevronLeftIcon style={{ width: "20px", height: "20px" }} />
          </CssIconButton>
        </div>
        <RequestForm />
      </div>
    </Dialog>
  );
};

export default SellerRequestBox;
