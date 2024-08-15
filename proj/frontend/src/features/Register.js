import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useRegisterMutation } from "./authApiSlice";

const Register = () => {
  const userRef = useRef();
  const errorRef = useRef();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [register] = useRegisterMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setError("");
  }, [user, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = {
      email: user,
      password: password,
    };

    try {
      await register(credentials).unwrap();
      setUser("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      console.log(error);
      setError("Invalid user or password");
    }
  };

  const handleUserInput = (e) => {
    setUser(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-indigo-600">
      <form
        className="w-96 p-6 shadow-lg bg-white rounded-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl block text-center font-semibold">Register</h1>
        <div className="mt-3">
          <label className="block text-base mb-2" htmlFor="username">
            Username:
          </label>
          <input
            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-md"
            type="text"
            id="username"
            ref={userRef}
            value={user}
            onChange={handleUserInput}
            autoComplete="on"
            required
          />
        </div>

        <div className="mt-3">
          {" "}
          <label className="block text-base mb-2" htmlFor="password">
            Password:
          </label>
          <input
            className="border w-full text-base px-2 py-1 mb-2 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-md"
            type="password"
            id="password"
            onChange={handlePasswordInput}
            value={password}
            required
          />
        </div>
        <p
          ref={errorRef}
          className={error ? "text-center text-red-600 my-2" : ""}
          aria-live="assertive"
        >
          {error}
        </p>

        <div className="mt-4">
          <button className="border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full rounded-md">
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};
export default Register;
