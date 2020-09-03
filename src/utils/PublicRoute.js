import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { getToken, getUser } from "./Common";

const PublicRoute = ({ component: Component, ...rest }) => {
  let guest = getUser();
  return (
    <Route
      {...rest}
      render={(props) =>
        !getToken() ? (
          <Component {...props} />
        ) : guest.is_admin ? (
          <Redirect to={{ pathname: "/admin" }} />
        ) : guest.is_teacher ? (
          <Redirect to={{ pathname: "/teacher" }} />
        ) : (
          <Redirect to={{ pathname: "/student" }} />
        )
      }
    />
  );
};

export default PublicRoute;
