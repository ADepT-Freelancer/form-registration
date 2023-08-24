import { Navigate, Outlet } from "react-router-dom";
import store from "../../store/store";

export const PrivateRoute = () => {
  const auth = store.getState().auth.isLogged;

  return auth ? <Outlet /> : <Navigate to="/auth" />;
};
