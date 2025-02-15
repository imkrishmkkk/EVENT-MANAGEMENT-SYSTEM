// PrivateRoute.jsx (existing)
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { currentUser, loading } = useSelector((state) => state.user);
  
  if (loading) {
    return <div className="flex justify-center py-8">Loading...</div>;
  }

  return currentUser ? <Outlet /> : <Navigate to="/sign-in" replace />;
}