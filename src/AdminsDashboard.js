import React from "react";
import styled from "styled-components";
import { Link, Switch, BrowserRouter } from "react-router-dom";
import { getUser, removeUserSession } from "./utils/Common";
import admin from "./images/admin.png";
import Home from "./Home";
import AdminsRoute from "./utils/AdminsRoute";
import Students from "./admin/Students";
import Teachers from "./admin/Teachers";
import Courses from "./admin/Courses";
import Classes from "./admin/Classes";

const AdminsDashboard = (props) => {
  let user = getUser();
  const handleLogout = () => {
    removeUserSession();
    props.history.push("/login");
  };
  return (
    <BrowserRouter>
      <ContainerFluid>
        <SideNavContainer>
          <SideProfile>
            <SideProfilePicture
              src={admin}
              alt="profile"
              className="profilePicture"
            />
            <div className="briefProfile">
              <ProfileName>{user.name}</ProfileName>
              <ProfileEmail>{user.email}</ProfileEmail>
            </div>
          </SideProfile>
          <SideNavItems>
            <Link to="/admin/classes">
              <SideNavItem>
                <i className="fa fa-school"></i>
                <NavLink>Classes</NavLink>
              </SideNavItem>
            </Link>
            <Link to="/admin/students">
              <SideNavItem>
                <i className="fa fa-graduation-cap"></i>
                <NavLink>Students</NavLink>
              </SideNavItem>
            </Link>
            <Link to="/admin/courses">
              <SideNavItem>
                <i className="fas fa-chalkboard-teacher"></i>
                <NavLink>Courses</NavLink>
              </SideNavItem>
            </Link>
            <Link to="/admin/teachers">
              <SideNavItem>
                <i className="fa fa-user-tie"></i>
                <NavLink>Teachers</NavLink>
              </SideNavItem>
            </Link>
            <Link to="/admin/subjects">
              <SideNavItem>
                <i className="fa fa-chalkboard"></i>
                <NavLink>Subjects</NavLink>
              </SideNavItem>
            </Link>
            <Link to="/profile">
              <SideNavItem>
                <i className="fa fa-cogs"></i>
                <NavLink>Settings</NavLink>
              </SideNavItem>
            </Link>
            <Link
              to="/admin"
              style={{ all: "unset", cursor: "pointer" }}
              onClick={handleLogout}
            >
              <SideNavItem>
                <i className="fa fa-sign-out-alt"></i>
                <NavLink>Logout</NavLink>
              </SideNavItem>
            </Link>
          </SideNavItems>
        </SideNavContainer>
        <Switch>
          <AdminsRoute exact path="/admin/students" component={Students} />
          <AdminsRoute exact path="/admin/teachers" component={Teachers} />
          <AdminsRoute exact path="/admin/courses" component={Courses} />
          <AdminsRoute exact path="/admin/classes" component={Classes} />
        </Switch>
        {/* <h1 className="area">Admins Dashboard </h1> */}
      </ContainerFluid>
    </BrowserRouter>
  );
};

const ContainerFluid = styled.div`
  display: flex;
`;
const SideNavContainer = styled.div`
  color: #333;
  display: flex;
  flex-direction: column;
  min-width: 300px;
  background: #f7f7f7;
  box-shadow: 11px 0px 16px -11px #ddd;
  height: 85vh;
  align-items: stretch;
  overflow: hidden;
  @media (max-width: 900px) {
    min-width: 60px;
    max-width: 60px;
  }
`;
const SideNavItems = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  @media (max-width: 900px) {
    padding: 10px;
  }
`;

const SideNavItem = styled.li`
  padding: 10px;
  margin: 5px;
  transition: background 0.5s;
  border-radius: 3px;
  transition: background 1s;
  &:hover {
    background: #edd;
  }
  @media (max-width: 900px) {
    text-align: center;
  }
`;
const NavLink = styled.h4`
  padding: 5px 10px;
  margin-left: 10px;
  display: inline-block;
  @media (max-width: 900px) {
    display: none;
  }
`;

const SideProfile = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: 0px 15px 11px -9px rgba(171, 171, 171, 0.14);
  padding: 10px 20px;
  margin-bottom: 20px;
`;
const SideProfilePicture = styled.img`
  max-height: 75px;
  border-radius: 50%;
  padding: 5px;
  margin: 5px;
  @media (max-width: 900px) {
    max-height: 50px;
  }
`;
const ProfileEmail = styled.h4`
  color: #999;
  font-size: 14px;
  @media (max-width: 900px) {
    display: none;
  }
`;

const ProfileName = styled.h3`
  font-weight: 100;
  font-size: 16px;
  @media (max-width: 900px) {
    display: none;
  }
`;

export default AdminsDashboard;
