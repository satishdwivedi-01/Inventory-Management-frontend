import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { login } from "../authSlice";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((s) => s.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await dispatch(login(form));
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };

  return (
    <div className="w-full bg-white/80 backdrop-blur-xl shadow-xl border border-gray-200/60 rounded-2xl p-8 sm:p-10 transition-all duration-300">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-3.5xl font-bold tracking-tight text-gray-900">
          Welcome back
        </h2>
        <p className="mt-2 text-gray-600 text-sm sm:text-base">
          Sign in to manage your inventory
        </p>
      </div>

      <form onSubmit={submitHandler} className="space-y-5">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="name@company.com"
            autoComplete="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={`
              w-full px-4 py-3.5 rounded-lg border border-gray-300 
              bg-white/70 focus:bg-white
              text-gray-900 placeholder:text-gray-400
              focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500
              transition-all duration-200 outline-none
            `}
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className={`
              w-full px-4 py-3.5 rounded-lg border border-gray-300 
              bg-white/70 focus:bg-white
              text-gray-900 placeholder:text-gray-400
              focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500
              transition-all duration-200 outline-none
            `}
          />
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className={`
            w-full py-3.5 px-6 mt-2
            font-medium text-white
            bg-gradient-to-r from-blue-600 to-indigo-600
            hover:from-blue-700 hover:to-indigo-700
            focus:ring-2 focus:ring-blue-500/40 focus:outline-none
            disabled:opacity-60 disabled:cursor-not-allowed
            rounded-lg shadow-md hover:shadow-lg
            transform transition-all duration-200
            active:scale-[0.98]
          `}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                />
              </svg>
              Signing in...
            </div>
          ) : (
            "Sign in"
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;