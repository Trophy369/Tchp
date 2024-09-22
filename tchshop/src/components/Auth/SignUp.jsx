import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../services";

const SignUp = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [signed, setSigned] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailInput = emailRef.current.value;
    const passwordInput = passwordRef.current.value;
    const confirmPasswordInput = confirmPasswordRef.current.value;

    if (passwordInput !== confirmPasswordInput) {
      alert("Passwords do not match.");
      return;
    }

    const { data } = await signup(emailInput, passwordInput);
    if (data.message === "User created successfully") {
      setSigned(data);
      const successMessage = "Your account has been created successfully!";
      localStorage.setItem("notification", successMessage); // Store notification in localStorage
    }
  };

  useEffect(() => {
    if (signed) {
      navigate("/signin");
    }
  }, [signed, navigate]);

  return (
    <section className="flex items-center justify-center px-4 py-4 my-8 bg-gray-50 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
          Create account
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                type="email"
                required
                className="relative block w-full px-3 py-2 my-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
                ref={emailRef}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                type="password"
                required
                className="relative block w-full px-3 py-2 my-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                ref={passwordRef}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                required
                className="relative block w-full px-3 py-2 my-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                ref={confirmPasswordRef}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="relative flex justify-center px-4 py-2 mx-auto text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md w-44 group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
            </button>
          </div>
        </form>
        <div className="text-center">
          Already have an account?
          <Link to={"/signin"} className="text-blue-500"> Login</Link>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
