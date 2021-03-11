import React from "react";
import { useIntl } from "react-intl";
import { CustomTab, CustomTabs } from "./CustomTab";

interface Props {
  tabIndex: number;
  tabList: string[];
  onChangeTab(newTabIndex: number): void;
}

const HeaderTab = (props: Props) => {
  const { tabIndex, tabList, onChangeTab } = props;

  const intl = useIntl();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    onChangeTab(newValue);
  };

  return (
    <CustomTabs
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
