import useAuth from "./Auth";
import { Navigate, useLocation } from "react-router";

export default function RequireAuth({ children }) {
  const { authed } = useAuth();
  const location = useLocation();

  return authed === true ? (
    children
  ) : (
    <Navigate to="/signin" replace state={{ path: location.pathname }} />
  );
}
