import React, { useState } from "react";
import { Link } from "react-router-dom";

const API_URL = process.env.API_URL;

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/api/auth/signIn`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setUser(response.data.user); // > react context api
        navigate("/user-dashboard");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || "로그인에 실패했습니다.");
      } else {
        setError("서버와의 연결에 실패했습니다.");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <div className="flex justify-center mb-4">
          <Link to="/">
            <img src="../images/ezfuzzy.png" alt="Logo" className="h-12" />
          </Link>
        </div>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Email address
            </label>
            <input
              type="email"
              className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
              id="email"
              name="email"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                id="password"
                name="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
          >
            SignIn
          </button>
        </form>
        <div className="mt-4">
          <Link to="/sign-up">
            <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
              SignUp
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
