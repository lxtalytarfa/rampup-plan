import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "./authSlice";

const RequireAuth = () => {
  const token = useSelector(selectToken);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  return <Outlet />;
};

export default RequireAuth;
