import React, { useEffect, useState } from "react";
import { removeUserSession, getUser, getToken } from "./utils/Common";
import Axios from "axios";
import CourseCard from "./components/CourseCard";

const TeachersDashboard = (props) => {
  const [loadingCourses, SetloadingCourses] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const token = getToken();
    const user = getUser();
    if (!token || !user.is_teacher) {
      return;
    }
    Axios.get("http://localhost:8000/api/teacher/courses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        SetloadingCourses(false);
        setCourses(res.data.courses);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleLogout = () => {
    removeUserSession();
    props.history.push("/login");
  };

  if (loadingCourses && getToken()) {
    return <div className="content">Loading Courses...</div>;
  }
  return (
    <>
      <h1>Teachers Dashboard</h1>
      <button onClick={handleLogout}> Log out</button>

      {courses.length ? (
        courses.map((item) => <CourseCard course={item} key={item.id} />)
      ) : (
        <h1> Nothing To show</h1>
      )}
    </>
  );
};
export default TeachersDashboard;
