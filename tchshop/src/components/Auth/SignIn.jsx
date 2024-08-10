import {  useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useValid from "../hooks/useValid";
import {useAuth} from "../authContext/AuthProvider"

const Signin = () => {
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
                // ref={emailRef}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                value={enteredEmail}
                placeholder="email"

              />
              {emailInputHasError && (
                <p className="text-center text-red-700">ERROR DISPLAY</p>
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
          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="text-center">
          Don't have an account?
          <Link to={"/signup"} className="text-blue-500">
            {" "}
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
