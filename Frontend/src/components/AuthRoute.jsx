// AuthRoute.jsx (new)
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthRoute() {
  const { currentUser, loading } = useSelector((state) => state.user);

  if (loading) {
    return <div className="flex justify-center py-8">Loading...</div>;
  }

  return currentUser ? <Navigate to="/dashboard" replace /> : <Outlet />;
}