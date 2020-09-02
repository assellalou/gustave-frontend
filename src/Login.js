import React, { useState } from "react";
import Axios from "axios";
import { setToken } from "./utils/Common";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setError(null);
    setLoading(true);
    Axios.post("http://localhost:8000/api/auth/login", {
      username: username,
      password: password,
    })
      .then((res) => {
        setLoading(false);
        setToken(res.data.access_token);
        // props.history.push("/dashboard");
        location.reload();
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 401) setError(error.response.data.error);
        else setError("Something went wrong. Please try gain later.");
      });
  };

  return (
    <>
      <h1>Login</h1>
      <form>
        <input
          type="text"
          autoComplete="new-password"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <>
            <small style={{ color: "red" }}>{error}</small>
          </>
        )}
        <input
          type="button"
          value={loading ? "Loading ..." : "Login"}
          onClick={handleLogin}
          disabled={loading}
        />
      </form>
    </>
  );
};

export default Login;
