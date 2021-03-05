import { Button } from "@material-ui/core";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { ReactComponent as KeyIcon } from "../../../../svg/vecter_vpn_key.svg";
import { ReactComponent as IPhoneIcon } from "../../../../svg/vector_iphone.svg";
import { ReactComponent as PersonIcon } from "../../../../svg/vector_person.svg";
import { FreeTextField } from "../../../common/component/elements";

interface Props {}

const SignUpForm = (props: Props) => {
  const intl = useIntl();

  return (
    <div
      style={{
        margin: "24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <FreeTextField
        placeholder={intl.formatMessage({ id: "phoneNumber" })}
        type="tel"
        startAdornmentIcon={
          <IPhoneIcon style={{ width: "20px", height: "20px" }} />
        }
      />

      <FreeTextField
        placeholder={intl.formatMessage({ id: "name" })}
        startAdornmentIcon={
          <PersonIcon style={{ width: "20px", height: "20px" }} />
        }
      />

      <FreeTextField
        placeholder={intl.formatMessage({ id: "password" })}
        startAdornmentIcon={
          <KeyIcon style={{ width: "20px", height: "20px" }} />
        }
        type="password"
      />

      <FreeTextField
        placeholder={intl.formatMessage({ id: "repeatPassword" })}
        startAdornmentIcon={
          <KeyIcon style={{ width: "20px", height: "20px" }} />
        }
        type="password"
      />

      <Button
        style={{ marginTop: "28px", marginBottom: "12px" }}
        variant="contained"
        color="primary"
        fullWidth
        size="large"
      >
        <FormattedMessage id="continue" />
      </Button>
    </div>
  );
};

export default SignUpForm;
