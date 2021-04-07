import React from "react";
import { CustomTab, CustomTabs } from "./CustomTab";

interface Props {
  tabIndex: number;
  tabList: string[];
  onChangeTab(newTabIndex: number): void;
  style?: React.CSSProperties;
}

const HeaderTab = (props: Props) => {
  const { style, tabIndex, tabList, onChangeTab } = props;

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    onChangeTab(newValue);
  };

  return (
    <CustomTabs
      style={style}
      value={tabIndex}
      onChange={handleChange}
      indicatorColor="primary"
      textColor="primary"
      variant="fullWidth"
    >
      {tabList.map((one) => (
        <CustomTab key={one} label={one} />
      ))}
    </CustomTabs>
  );
};

export default HeaderTab;
