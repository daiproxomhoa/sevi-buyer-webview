import { Typography } from "@material-ui/core";
import React from "react";
import { FormattedMessage } from "react-intl";
import { ROUTES } from "../../../configs/routes";
import { PageWrapper } from "../../common/component/elements";
import { RawLink } from "../../common/component/Link";
import HeaderBox from "../component/HeaderBox";
import SignUpForm from "../component/signUp/SignUpForm";

interface ISignUpPageProps {}

const SignUpPage: React.FunctionComponent<ISignUpPageProps> = (props) => {
  return (
    <PageWrapper>
      <HeaderBox title="registerAccount" caption="registerNow" />

      <SignUpForm />

      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "flex-end",
          marginBottom: "52px",
        }}
      >
        <Typography variant="caption" color="textSecondary">
          <FormattedMessage id="alreadyHaveAnAccount" />
          &nbsp;
          <RawLink to={ROUTES.login}>
            <Typography component="span" variant="caption" color="textPrimary">
              <FormattedMessage id="login" />
            </Typography>
          </RawLink>
        </Typography>
      </div>
    </PageWrapper>
  );
};

export default SignUpPage;
