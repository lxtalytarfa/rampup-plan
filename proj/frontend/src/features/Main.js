import { useSelector } from "react-redux";
import { selectUser, selectToken } from "./authSlice";
import { Link } from "react-router-dom";
import Task from "./tasks/task";

const Main = () => {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  return (
    <div className="flex justify-center items-center h-screen bg-indigo-600">
      <div className="w-3/4 p-6 shadow-lg bg-white rounded-md">
        <h1 className="text-3xl block text-center font-semibold">Welcome!</h1>
        <div className="mt-3">
          <p className="block text-base mb-2">User: {user ? user : "None"}</p>
          <Link className="block text-base mb-2" to="/logout">
            Logout
          </Link>
          <Task />
        </div>
      </div>
    </div>
  );
};

export default Main;
