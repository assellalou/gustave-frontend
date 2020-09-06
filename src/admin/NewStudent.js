import React, { useState, useEffect } from "react";
import Axios from "axios";
import { getToken } from "../utils/Common";

const NewStudent = () => {
  const [name, setName] = useState();
  const [email, setemail] = useState();
  const [phone, setPhone] = useState();
  const [username, setUsername] = useState();
  const [city, setCity] = useState();
  const [adresse, setAdresse] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();
  const token = getToken();
  const [classes, setclasses] = useState([]);
  const [selectedClasse, setSelectedClasse] = useState();
  useEffect(() => {
    const token = getToken();
    Axios.get("http://localhost:8000/api/admin/classes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setclasses(res.data.classes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addStudent = (e) => {
    e.preventDefault();
    Axios({
      url: "http://localhost:8000/api/admin/user/new",
      method: "POST",
      data: {
        name: name,
        email: email,
        phone: phone,
        username: username,
        city: city,
        adresse: adresse,
        classe: selectedClasse,
        password: password,
        password_confirmation: passwordConfirmation,
        is_admin: 0,
        is_teacher: 0,
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
    <form>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={(e) => setemail(e.target.value)}
      />
      <input
        type="tel"
        name="phone"
        placeholder="phone"
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <select name="classe" onChange={(e) => setSelectedClasse(e.target.value)}>
        {classes.map((item) => (
          <option value={item.id} key={item.id}>
            {item.nomination}
          </option>
        ))}
      </select>
      <select name="city" onChange={(e) => setCity(e.target.value)}>
        <option value="Meknes">Meknes</option>
        <option value="Rabat">Rabat</option>
        <option value="Casablanca">Casablanca</option>
      </select>
      <textarea
        name="adresse"
        cols="30"
        rows="5"
        placeholder="Adresse"
        onChange={(e) => setAdresse(e.target.value)}
      ></textarea>
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        name="password_confirmation"
        placeholder="Confirm password"
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />
      <button onClick={addStudent}>Add</button>
    </form>
  );
};
export default NewStudent;
