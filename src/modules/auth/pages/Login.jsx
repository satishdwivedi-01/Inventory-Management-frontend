import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-neutral-100 to-stone-200 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-[420px]">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;