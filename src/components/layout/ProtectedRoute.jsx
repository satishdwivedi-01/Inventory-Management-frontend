import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

const ProtectedRoute = ({ children, roles }) => {

  const { user, checkingAuth } = useAppSelector((s) => s.auth);


  if (checkingAuth) {
    return <div>Loading...</div>;   // or spinner
  }
  if (!user) return <Navigate to="/login" />;

  if (roles && !roles.includes(user.role)) {
    return <div className="p-6">Not authorized</div>;
  }

  return children;
};

export default ProtectedRoute;
