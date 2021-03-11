import { AppBar, Tabs, Tab } from "@material-ui/core";
import React from "react";
import { useIntl } from "react-intl";
import { CustomTab, CustomTabs } from "../../common/component/CustomTab";

interface Props {
  tabIndex: number;
  onChangeTab(newTabIndex: number): void;
}

const HeaderTab = (props: Props) => {
  const { tabIndex, onChangeTab } = props;

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
      <CustomTab label={intl.formatMessage({ id: "request.requesting" })} />
      <CustomTab label={intl.formatMessage({ id: "request.received" })} />
    </CustomTabs>
  );
};

export default HeaderTab;
