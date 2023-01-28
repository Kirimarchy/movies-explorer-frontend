import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuth, child }) => {
    if (!isAuth) {
      return <Navigate to="/about" replace />;
    }

    return child;
  };

export default ProtectedRoute;  