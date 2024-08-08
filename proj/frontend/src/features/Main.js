import { useSelector } from "react-redux";
import { selectUser, selectToken } from "./authSlice";
import { Link } from "react-router-dom";
import Task from "./tasks/task";

const Main = () => {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  return (
    <div>
      <h1>Main</h1>
      <p>User: {user ? user : "None"}</p>
      <p>Token: {token ? token : "None"}</p>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/logout">Logout</Link>
      <Task />
    </div>
  );
};

export default Main;
