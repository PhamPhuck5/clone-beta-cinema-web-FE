import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  if (!isLoggedIn) return <Navigate to="/login?target=login" replace />;

  return children;
};

export default ProtectedRoute;

/*
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const from = location.state?.from?.pathname || "/";
  
  if ok
  navigate(from, { replace: true });
*/
