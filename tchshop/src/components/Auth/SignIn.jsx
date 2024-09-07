import { useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signInUserAsync } from "../../reducers/userReducer";
import useValid from "../hooks/useValid";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  const {
    value: enteredEmail,
    isValid: enteredEmailisValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useValid((value) => value.includes("@"));

  let formIsValid = enteredEmailisValid;

  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!enteredEmailisValid) {
      return;
    }
    const emailInput = enteredEmail;
    const passwordInput = passwordRef.current.value;
    resetEmailInput();
    dispatch(signInUserAsync(emailInput, passwordInput));
  };

  useEffect(() => {
    if (user) {
      user.roles === 2 ? navigate("/admin") : navigate("/");
    }
  }, [user, navigate]);

  const emailInputClasses = emailInputHasError
    ? "border-red-500"
    : "border-gray-300";

  return (
    <section className="flex items-center justify-center px-4 py-4 my-8 bg-gray-50 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
          Login account
        </h2>
        <form onSubmit={handleSubmit} className="mt-2 space-y-6">
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                type="email"
                className={`relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none ${emailInputClasses} rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm my-2`}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                value={enteredEmail}
                placeholder="Email"
              />
              {emailInputHasError && (
                <p className="mt-2 text-sm text-center text-red-700">
                  Email must contain '@'
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full px-3 py-2 my-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                ref={passwordRef}
              />
            </div>
          </div>

          {loading && (
            <button
              type="button"
              className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-500 border border-transparent rounded-md shadow cursor-not-allowed hover:bg-indigo-400"
              disabled
              aria-busy="true"
              aria-label="Loading"
            >
              <svg className="w-5 h-5 mr-3 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a12 12 0 00-11 11h4l-3 3 3 3h-4a8 8 0 018-8z"></path>
              </svg>
              Authenticating...
            </button>
          )}

          {error && <p className="mt-4 text-sm text-center text-red-700">{error}</p>}

          <div>
            <button
              type="submit"
              className="relative flex justify-center px-4 py-2 mx-auto text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md w-44 group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading}
            >
              Login
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-gray-700">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-blue-500 hover:underline">Sign Up</Link>
          </p>
          <p className="mt-4">
            <Link to={"/forgot-password"} className="text-blue-500 transition duration-200 ease-in-out hover:underline hover:text-indigo-700">Forgot Password?</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signin;
