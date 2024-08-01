import { useSelector } from "react-redux";
import { selectUser, selectToken } from "./authSlice";
import { Link } from "react-router-dom";

const Main = () => {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  return (
    <div>
      <h1>Main</h1>
      <p>User: {user ? user : "None"}</p>
      <p>Token: {token ? token : "None"}</p>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Main;
