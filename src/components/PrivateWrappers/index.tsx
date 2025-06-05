import { Navigate, Outlet } from "react-router-dom";
import { useValidateToken } from "../../hooks/useValidateToken";

const PrivateRoutes = () => {
  const { isSuccess } = useValidateToken();
  return isSuccess ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoutes;
