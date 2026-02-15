import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../modules/auth/authSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);

  return (
    <div className="bg-white border-b px-6 py-3 flex justify-between">
      <p className="font-semibold">
        Welcome, {user?.name}
      </p>

      <button
        onClick={() => dispatch(logout())}
        className="text-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
