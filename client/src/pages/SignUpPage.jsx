import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // validation states
  const [usernameValid, setUsernameValid] = useState(null);
  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const checkAvailability = async (type, value) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/auth/check${type}`, {
        params: { [type.toLowerCase()]: value },
      });
      if (type === "Username") {
        setUsernameValid(response.data.available);
      } else if (type === "Email") {
        setEmailValid(response.data.available);
      }
    } catch (error) {
      console.error(`Error checking ${type} availability:`, error);
      if (type === "Username") {
        setUsernameValid(false);
      } else if (type === "Email") {
        setEmailValid(false);
      }
    }
  };

  const handleBlur = (type) => {
    if (type === "username" && username) {
      checkAvailability("Username", username);
    } else if (type === "email" && email) {
      checkAvailability("Email", email);
    } else if (type === "confirmPassword") {
      setPasswordValid(password === confirmPassword);
    }
  };

  useEffect(() => {
    if (usernameValid && emailValid && passwordValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [usernameValid, emailValid, passwordValid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      setErrorMessage("Please correct the form errors before submitting.");
      return;
    }
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/api/auth/signUp`, {
        email,
        username,
        password,
      });
      if (response.data.message === "User signUp successfully") {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.response.data.error || "An error occurred during sign up");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <a href="/">
          <img src="../images/ezfuzzy.png" alt="Logo" className="mx-auto mb-6 h-16" />
        </a>
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              className={`form-input mt-1 block w-full ${usernameValid === false ? "border-red-500" : ""} ${
                usernameValid === true ? "border-green-500" : ""
              }`}
              id="username"
              name="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => handleBlur("username")}
              required
            />
            {usernameValid === false && <p className="text-red-500 text-xs">Username is already taken.</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email address
            </label>
            <input
              type="email"
              className={`form-input mt-1 block w-full ${emailValid === false ? "border-red-500" : ""} ${
                emailValid === true ? "border-green-500" : ""
              }`}
              id="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur("email")}
              required
            />
            {emailValid === false && <p className="text-red-500 text-xs">Email is already in use.</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              className="form-input mt-1 block w-full"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirm-password" className="block text-gray-700 font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              className={`form-input mt-1 block w-full ${passwordValid === false ? "border-red-500" : ""} ${
                passwordValid === true ? "border-green-500" : ""
              }`}
              id="confirm-password"
              name="confirm-password"
              placeholder="Type password one more time"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() => handleBlur("confirmPassword")}
              required
            />
            {passwordValid === false && <p className="text-red-500 text-xs">Passwords do not match.</p>}
          </div>
          {errorMessage && <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>}
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 ${
              !isFormValid ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!isFormValid}
          >
            Sign Up
          </button>
        </form>
        <div className="text-center mt-3">
          <p>
            Already have an account?{" "}
            <a href="/sign-in" className="text-blue-500 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
