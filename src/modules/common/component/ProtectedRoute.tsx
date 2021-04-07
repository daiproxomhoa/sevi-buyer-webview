import React from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { ROUTES } from "../../../configs/routes";

interface Props extends RouteProps {
  auth: boolean;
}

const ProtectedRoute: React.FC<Props> = (props) => {
  const { auth, ...restProps } = props;
  if (auth) {
    return <Route {...restProps} />;
  }
  const from =
    (props.location && `${props.location.pathname}${props.location.search}`) ||
    "/";
  return (
    <Redirect
      to={{
        pathname: `${ROUTES.login}`,
        search: `?from=${encodeURIComponent(from)}`,
      }}
    />
  );
};

export default ProtectedRoute;
