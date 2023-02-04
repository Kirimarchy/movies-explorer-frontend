import { useContext } from "react";
import { Navigate } from "react-router-dom";
import CurrentUserContext from "../../utils/context/CurrentUserContext";

const ProtectedRoute = ({ child }) => {

  const {isAuth} = useContext(CurrentUserContext);

    if (!isAuth) {
      return <Navigate to="/about" replace />;
    }

    return child;
  };

export default ProtectedRoute;  