import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(loginData);
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center min-h-screen items-center bg-gray-100">
      <div className="flex items-stretch max-w-3xl w-full rounded-2xl ">
        {/* Left Side - Image */}
        <div className="hidden lg:block w-1/2">
          <img
            src="/Login.svg"
            alt="Login Illustration"
            className="h-full w-full object-cover rounded-l-2xl"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 px-6 py-12 flex flex-col justify-center">
          <h1 className="flex items-center justify-center text-gray-900 text-3xl font-bold mb-6">
            <img
              src="https://img.freepik.com/free-vector/colorful-letter-gradient-logo-design_474888-2309.jpg"
              alt="Logo"
              className="w-16 h-16 rounded-2xl"
            />
            Welcome Admin
          </h1>
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
              className="w-full h-12 text-gray-900 placeholder-gray-400 text-lg border border-gray-300 rounded-full px-4"
              placeholder="Email"
              required
            />
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              className="w-full h-12 text-gray-900 placeholder-gray-400 text-lg border border-gray-300 rounded-full px-4"
              placeholder="Password"
              required
            />
            <div className="flex justify-between">
              <a href="#" className="text-indigo-600 text-base">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full h-12 text-white bg-indigo-600 rounded-full text-lg font-semibold hover:bg-indigo-800 transition-all duration-300"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
