import React, {useEffect, useState} from 'react'

const Subjects = () => {

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
  return (

  )
}