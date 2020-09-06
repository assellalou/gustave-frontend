import React, { useState } from "react";
import Axios from "axios";
import { getToken } from "../utils/Common";

const NewClasse = () => {
  const [nomination, setNomination] = useState();
  const [level, setLevel] = useState();
  const token = getToken();

  const addClasse = (e) => {
    e.preventDefault();

    Axios({
      url: "http://localhost:8000/api/admin/classe/new",
      method: "POST",
      data: {
        nomination: nomination,
        level: level,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((error) => {
        alert("something went wrong!");
      });
  };

  return (
    <>
      <form>
        <input
          type="text"
          name="nomination"
          placeholder="Name"
          onChange={(e) => setNomination(e.target.value)}
        />
        <input
          type="text"
          name="level"
          placeholder="Level"
          onChange={(e) => setLevel(e.target.value)}
        />
        <button onClick={addClasse}>Add</button>
      </form>
    </>
  );
};

export default NewClasse;
