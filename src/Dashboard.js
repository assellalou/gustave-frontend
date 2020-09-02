import React from "react";
import { removeUserSession } from "./utils/Common";

const Dashboard = (props) => {
  const handleLogout = () => {
    removeUserSession();
    props.history.push("/login");
  };
  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}> Log out</button>
    </>
  );
};
export default Dashboard;
