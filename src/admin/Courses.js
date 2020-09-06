import React, { useEffect, useState } from "react";
import Axios from "axios";
import { getUser, getToken } from "../utils/Common";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  useEffect(() => {
    const token = getToken();
    const user = getUser();
    if (!token || !user.is_admin) {
      return;
    }
    Axios.get("http://localhost:8000/api/admin/courses", {
      headers: {
        Authorization: "Bearer" + token,
      },
    })
      .then((res) => {
        setLoadingCourses(false);
        setCourses(res.data.courses);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (loadingCourses) {
    return <p>Loading Courses ...</p>;
  }
  return (
    <>
      {courses.length ? (
        courses.map((item) => <h1>{item.name}</h1>)
      ) : (
        <h1>No Courses to show</h1>
      )}
    </>
  );
};

export default Courses;
