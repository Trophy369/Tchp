import { useState } from "react";
import { forgotPassword, verifyCode, resetPassword } from "../../services";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await forgotPassword(email);
      setStep(2);
      setMessage("A reset code has been sent to your email, if not inside inbox check your spam folder.");
    } catch (err) {
      setError(err.message || "Failed to send reset code.");
    } finally {
      setLoading(false);
    }
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await verifyCode(code);
      setStep(3);
      setMessage("Code verified successfully! Please reset your password.");
    } catch (err) {
      setError(err.message || "Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      const response = await resetPassword(password, confirmPassword);
      setMessage("Password has been reset successfully! You can now log in.");
      setStep(1);
    } catch (err) {
      setError(err.message || "Password reset failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-4 my-8 bg-gray-50 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
          {step === 1 ? "Forgot Password" : step === 2 ? "Verify Code" : "Reset Password"}
        </h2>
        <p className="mt-2 text-sm text-center text-gray-600">
          {step === 1
            ? "Enter your email address to receive a reset code."
            : step === 2
            ? "Enter the code sent to your email."
            : "Enter your new password."}
        </p>

        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm">
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  className="relative block w-full px-3 py-2 my-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {loading && <p className="text-center text-blue-700">Sending...</p>}
            {error && <p className="text-center text-red-700">{error}</p>}
            {message && <p className="text-center text-green-700">{message}</p>}

            <div>
              <button
                type="submit"
                className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={loading}
              >
                Send Reset Code
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleCodeSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm">
              <div>
                <label htmlFor="code" className="sr-only">Verification Code</label>
                <input
                  id="code"
                  type="text"
                  required
                  className="relative block w-full px-3 py-2 my-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Verification Code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
            </div>

            {loading && <p className="text-center text-blue-700">Verifying...</p>}
            {error && <p className="text-center text-red-700">{error}</p>}
            {message && <p className="text-center text-green-700">{message}</p>}

            <div>
              <button
                type="submit"
                className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={loading}
              >
                Verify Code
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handlePasswordSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm">
              <div>
                <label htmlFor="password" className="sr-only">New Password</label>
                <input
                  id="password"
                  type="password"
                  required
                  className="relative block w-full px-3 py-2 my-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            {loading && <p className="text-center text-blue-700">Resetting password...</p>}
            {error && <p className="text-center text-red-700">{error}</p>}
            {message && <p className="text-center text-green-700">{message}</p>}

            <div>
              <button
                type="submit"
                className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={loading}
              >
                Reset Password
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
