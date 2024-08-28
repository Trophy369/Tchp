<<<<<<< HEAD
import {  useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
=======
import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signInUserAsync } from "../../reducers/userReducer";
>>>>>>> 6c8515be898ddd2e8ff2c16370f7a63a0ff542c1
import useValid from "../hooks/useValid";

const Signin = () => {
<<<<<<< HEAD
  const navigate = useNavigate()
  const auth = useAuth()
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //     const data = await getUser();
  //     setData(data)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   };

  //   fetchUser();
  // }, []);
=======
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);
>>>>>>> 6c8515be898ddd2e8ff2c16370f7a63a0ff542c1

  const {
    value: enteredEmail,
    isValid: enteredEmailisValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useValid((value) => value.includes("@"));

  let formIsValid = false;

  if (enteredEmailisValid) {
    formIsValid = true;
  }

  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!enteredEmailisValid) {
      return;
    }
    const emailInput = enteredEmail;
    const passwordInput = passwordRef.current.value;
    resetEmailInput();
<<<<<<< HEAD
    // validation
    auth.auth(emailInput, passwordInput)
    navigate("/")
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!enteredEmailisValid) {
  //     console.log("liner");
  //     return;
  //   }
  //   const emailInput = enteredEmail;
  //   const passwordInput = passwordRef.current.value;
  //   resetEmailInput();
  //   // validation
  //   const info = await signin(emailInput, passwordInput);
  //   navigate("/")
  //   setData(info.data)
  //   localStorage.setItem("user", JSON.stringify(info.data));
  // };
=======
    dispatch(signInUserAsync(emailInput, passwordInput));
  };

  useEffect(() => {
    if (user) {
      user.roles === 2 ? navigate("/admin") : navigate("/");
    }
  }, [user, navigate]);
>>>>>>> 6c8515be898ddd2e8ff2c16370f7a63a0ff542c1

  const emailInputClasses = emailInputHasError
    ? "text-center text-red-700"
    : "";

  return (
    <div className="flex items-center justify-center px-4 py-6 bg-gray-50 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Log in to your account
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="-space-y-px rounded-md shadow-sm">
            <div className={emailInputClasses}>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                value={enteredEmail}
                placeholder="email"
              />
              {emailInputHasError && (
                <p className="text-center text-red-700">
                  Email must contain '@'
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                ref={passwordRef}
              />
            </div>
          </div>

          {/* Display loading spinner or text */}
          {loading && <p className="text-center text-blue-700">Loading...</p>}

          {/* Display error message */}
          {error && <p className="text-center text-red-700">{error}</p>}

          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading} // Disable button while loading
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-gray-700">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
          <p className="mt-4">
            <Link
              to={"/forgot-password"}
              className="text-blue-500 hover:underline hover:text-indigo-700 transition duration-200 ease-in-out"
            >
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
