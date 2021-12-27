import useAuth from "./Auth";
import { Navigate, useLocation } from "react-router";

export default function RequireAuth({ children }) {
  const { token } = useAuth();
  const location = useLocation();

  return token ? (
    children
  ) : (
    <Navigate to="/signin" replace state={{ path: location.pathname }} />
  );
}
