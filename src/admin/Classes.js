import React, { useState, useEffect } from "react";
import Axios from "axios";
import { getUser, getToken } from "../utils/Common";
import NewClasse from "./NewClasse";
import styled from "styled-components";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [addClasse, setAddClasse] = useState(false);

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

  const handleAddClasse = () => {
    setAddClasse(!addClasse);
  };

  if (loadingClasses) {
    return <p>Loading Classes ...</p>;
  }
  return (
    <>
      <Container>
        <ModalContainer style={{ display: addClasse ? "flex" : "none" }}>
          <Modal>
            <NewClasse />
            <button onClick={handleAddClasse}>Close</button>
          </Modal>
        </ModalContainer>
        <button onClick={handleAddClasse}>New Classe</button>
        {classes.length ? (
          <table>
            <thead>
              <tr>
                <th>Classe Name</th>
                <th>Classe Level</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((item) => (
                <tr key={item.id}>
                  <td>{item.nomination}</td>
                  <td>{item.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h1>No classes found </h1>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const ModalContainer = styled.div`
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  background: #ffffff;
  padding: 20px;
`;

export default Classes;
