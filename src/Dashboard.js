import React, { useEffect, useState } from "react";
import { removeUserSession, getUser, getToken } from "./utils/Common";
import Axios from "axios";
import CourseCard from "./components/CourseCard";

const Dashboard = (props) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    const user = getUser();
    if (!token || !user.is_teacher) {
      return;
    }
    Axios.get("http://localhost:8000/api/teacher/courses", {
      headers: {
        Authorization: "Bearer" + token,
      },
    })
      .then((res) => {
        setCourses(res.data.courses);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleLogout = () => {
    removeUserSession();
    props.history.push("/login");
  };

  if (loading && getToken()) {
    return <div className="content">Loading...</div>;
  }
  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}> Log out</button>

      {courses.length ? (
        courses.map((item) => <CourseCard course={item} key={item.id} />)
      ) : (
        <h1> Nothing To show</h1>
      )}
    </>
  );
};
export default Dashboard;
