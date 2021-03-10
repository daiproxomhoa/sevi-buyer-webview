import { Dialog } from "@material-ui/core";
import React from "react";
import { SlideUp } from "../../common/component/elements";

interface Props {
  open: boolean;
  onClose(): void;
}

const FilterBox = (props: Props) => {
  const { open, onClose } = props;

  return (
    <Dialog
      open={open}
      TransitionComponent={SlideUp}
      style={{
        alignItems: "flex-end",
      }}
      PaperProps={{
        style: {
          margin: 0,
          width: "100%",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        },
      }}
      onBackdropClick={onClose}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          minHeight: "60px",
          background: "white",
        }}
      >
        12312312312
      </div>
    </Dialog>
  );
};

export default FilterBox;
