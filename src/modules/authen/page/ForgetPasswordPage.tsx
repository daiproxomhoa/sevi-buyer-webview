import * as React from "react";
import ForgotPasswordBox from "../component/ForgotPassword";

interface IForgetPasswordPageProps {}

const ForgetPasswordPage: React.FunctionComponent<IForgetPasswordPageProps> = (
  props
) => {
  return (
    <>
      <ForgotPasswordBox />
    </>
  );
};

export default ForgetPasswordPage;
