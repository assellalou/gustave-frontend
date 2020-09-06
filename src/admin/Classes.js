import React, { useState, useEffect } from "react";
import Axios from "axios";
import { getUser, getToken } from "../utils/Common";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [loadingClasses, setLoadingClasses] = useState(true);

  useEffect(() => {
    const token = getToken();
    const user = getUser();
    if (!token || !user.is_admin) {
      return;
    }
    Axios.get("http://localhost:8000/api/admin/classes", {
      headers: {
        Authorization: "Bearer" + token,
      },
    })
      .then((res) => {
        setLoadingClasses(false);
        setClasses(res.data.classes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (loadingClasses) {
    return <p>Loading Classes ...</p>;
  }

  return (
    <>
      {classes.length ? (
        classes.map((item) => <h1 key={item.id}>{item.id}</h1>)
      ) : (
        <h1>No classes found </h1>
      )}
    </>
  );
};

export default Classes;
