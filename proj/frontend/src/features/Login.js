import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";

const Login = () => {
  const userRef = useRef();
  const errorRef = useRef();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setError("");
  }, [user, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = new URLSearchParams();
    credentials.append("grant_type", "");
    credentials.append("username", user);
    credentials.append("password", password);
    credentials.append("scope", "");
    credentials.append("client_id", "");
    credentials.append("client_secret", "");

    try {
      const data = await login(credentials).unwrap();
      dispatch(setCredentials({ user: user, accessToken: data.access_token }));
      setUser("");
      setPassword("");
      navigate("/main");
    } catch (error) {
      setError("Invalid user or password");
    }
  };

  const handleUserInput = (e) => {
    setUser(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section className="login">
      <p
        ref={errorRef}
        className={error ? "error" : "offscreen"}
        aria-live="assertive"
      >
        {error}
      </p>

      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          value={user}
          onChange={handleUserInput}
          autoComplete="off"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={handlePasswordInput}
          value={password}
          required
        />
        <button>Sign In</button>
      </form>
    </section>
  );
};
export default Login;
