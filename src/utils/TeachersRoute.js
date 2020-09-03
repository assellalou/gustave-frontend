import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getToken, getUser } from "./Common";

const TeachersRoute = ({ component: Component, ...rest }) => {
  let guest = getUser();
  return (
    <Route
      {...rest}
      render={(props) =>
        guest ? (
          getToken() && guest.is_teacher ? (
            <Component {...props} />
          ) : guest.is_admin ? (
            <Redirect
              to={{ pathname: "/admin", state: { from: props.location } }}
            />
          ) : guest.is_teacher ? (
            <Redirect
              to={{ pathname: "/teacher", state: { from: props.location } }}
            />
          ) : (
            <Redirect
              to={{ pathname: "/student", state: { from: props.location } }}
            />
          )
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};
export default TeachersRoute;
