import React, { useState, useEffect } from "react";
import { getUser, getToken } from "../utils/Common";
import Axios from "axios";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loadingTeachers, setLoadingTeachers] = useState(true);
  useEffect(() => {
    const token = getToken();
    const user = getUser();
    if (!token || !user.is_admin) {
      return;
    }
    Axios.get("http://localhost:8000/api/admin/teachers", {
      headers: {
        Authorization: "Bearer" + token,
      },
    })
      .then((res) => {
        setLoadingTeachers(false);
        setTeachers(res.data.teachers);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (loadingTeachers) {
    return <p>Loading Students ...</p>;
  }
  return (
    <>
      {teachers.length ? (
        teachers.map((item) => <h1 key={item.id}>{item.name}</h1>)
      ) : (
        <h1>no teachers found</h1>
      )}
    </>
  );
};

export default Teachers;
