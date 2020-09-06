import React, { useState, useEffect } from "react";
import { getUser, getToken } from "../utils/Common";
import Axios from "axios";
import styled from "styled-components";
import NewStudent from "./NewStudent";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [addStudent, setAddStudent] = useState(false);

  useEffect(() => {
    const token = getToken();
    const user = getUser();
    if (!token || !user.is_admin) {
      return;
    }
    Axios.get("http://localhost:8000/api/admin/students", {
      headers: {
        Authorization: "Bearer" + token,
      },
    })
      .then((res) => {
        setStudents(res.data.students);
        setLoadingStudents(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAddingStudent = () => {
    setAddStudent(!addStudent);
  };
  if (loadingStudents) return <p>Loading Students ...</p>;
  return (
    <>
      <ModalContainer style={{ display: addStudent ? "flex" : "none" }}>
        <Modal>
          <NewStudent />
          <button onClick={handleAddingStudent}>Close</button>
        </Modal>
      </ModalContainer>
      <Container>
        <button onClick={handleAddingStudent}>New Student</button>
        <table style={{ marginTop: 50 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Username</th>
              <th>Adresse</th>
              <th>Classe</th>
            </tr>
          </thead>
          <tbody>
            {students.map((item) => (
              <Row key={item.key}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.username}</td>
                <td>{`${item.city} ${item.adresse}`}</td>
                <td>{item.classe}</td>
              </Row>
            ))}
          </tbody>
        </table>
      </Container>
    </>
  );
};
export default Students;

const Row = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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
