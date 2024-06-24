import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  //TODO: login logic

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
        <form action="/api/auth/signIn" method="POST">
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
