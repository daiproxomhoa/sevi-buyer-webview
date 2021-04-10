import { Dialog, Divider, Theme } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";
import { SlideUp } from "../../../common/component/elements";
import { ISellerSearchFilter } from "../../model";
import MenuSortBy from "./MenuSortBy";
import SelectAddress from "./SelectAddress";
import SlideRadius from "./SlideRadius";

const FilterDialog = withStyles((theme: Theme) => ({
  root: {},
  scrollPaper: {
    alignItems: "flex-end",
  },
}))(Dialog);

interface Props {
  filter: ISellerSearchFilter;
  open: boolean;
  onClose(): void;
}

const FilterBox = (props: Props) => {
  const { filter, open, onClose } = props;
  const [filterTmp, setFilterTmp] = React.useState(props.filter);

  return (
    <FilterDialog
      open={open}
      TransitionComponent={SlideUp}
      style={{
        alignItems: "flex-end",
      }}
      PaperProps={{
        style: {
          padding: "24px",
          margin: 0,
          width: "100%",
          borderRadius: "16px 16px 0 0",
        },
      }}
      onBackdropClick={onClose}
    >
      <SelectAddress />

      <SlideRadius
        filter={filterTmp}
        setFilter={(data) => setFilterTmp(data)}
      />

      <Divider style={{ width: "100%" }} />

      <MenuSortBy filter={filterTmp} setFilter={(data) => setFilterTmp(data)} />
    </FilterDialog>
  );
};

export default FilterBox;
