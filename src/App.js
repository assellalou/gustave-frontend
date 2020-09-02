import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import Axios from "axios";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Home from "./Home";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import { getToken, removeUserSession, setUser } from "./utils/Common";

const App = () => {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
    Axios.get("http://localhost:8000/api/auth/me", {
      headers: {
        Authorization: "Bearer" + token,
      },
    })
      .then((res) => {
        setUser(res.data);
        setAuthLoading(false);
      })
      .catch((error) => {
        removeUserSession();
        setAuthLoading(false);
      });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication ...</div>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="header">
            <NavLink exact activeClassName="active" to="/">
              Home
            </NavLink>
            <NavLink activeClassName="active" to="/login">
              Login
            </NavLink>
            <NavLink activeClassName="active" to="/dashboard">
              Dashboard
            </NavLink>
          </div>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Home} />
              <PublicRoute exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
