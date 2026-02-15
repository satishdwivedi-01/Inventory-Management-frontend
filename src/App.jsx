import { useEffect } from "react";
import { useAppDispatch , useAppSelector} from "./app/hooks";
import { getMe } from "./modules/auth/authSlice";
import AppRoutes from "./routes/AppRoutes";



function App() {
  const dispatch = useAppDispatch();
  const { isCheckingAuth } = useAppSelector((s) => s.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  if (isCheckingAuth) {
    return <div className="p-6">Checking session...</div>;
  }

  return <AppRoutes />;
}

export default App;
