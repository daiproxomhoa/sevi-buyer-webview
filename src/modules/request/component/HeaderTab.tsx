import { AppBar, Tabs, Tab } from "@material-ui/core";
import React from "react";
import { useIntl } from "react-intl";
import { CustomTab, CustomTabs } from "../../common/component/CustomTab";

interface Props {}

const HeaderTab = (props: Props) => {
  const intl = useIntl();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <CustomTabs
      value={value}
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
