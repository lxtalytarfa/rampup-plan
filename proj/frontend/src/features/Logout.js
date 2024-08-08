import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "./authSlice";

const Logout = () => {
  const dispatch = useDispatch();

  dispatch(logout());

  return (
    <div>
      <h1>Logged Out.</h1>
    </div>
  );
};

export default Logout;
