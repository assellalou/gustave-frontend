import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import Axios from "axios";
import Login from "./Login";
import Dashboard from "./Dashboard";
import TeachersDashboard from "./TeachersDashboard";
import Home from "./Home";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import TeachersRoute from "./utils/TeachersRoute";
import AdminsDashboard from "./AdminsDashboard";
import AdminsRoute from "./utils/AdminsRoute";
import StudentsDashboard from "./StudentsDashboard";
import { getToken, removeUserSession, setUser } from "./utils/Common";
import Modal from "./components/Modal";
import Page404 from "./Page404";

const App = () => {
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState();

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
      {error ? <Modal item={error} /> : ""}
      <BrowserRouter>
        <div>
          <div className="header">
            <div className="left">
              <NavLink exact activeClassName="active" to="/">
                Home
              </NavLink>
              <NavLink activeClassName="active" to="/login">
                {getToken() ? "Dashboard" : " Login"}
              </NavLink>
            </div>
            <div className="right">
              <a href="#">Language</a>
            </div>
          </div>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Home} />
              <PublicRoute exact path="/login" component={Login} />
              <AdminsRoute exact path="/admin" component={AdminsDashboard} />
              <TeachersRoute
                exact
                path="/teacher"
                component={TeachersDashboard}
              />
              <PrivateRoute
                exact
                path="/student"
                component={StudentsDashboard}
              />
              <Route component={Page404} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
