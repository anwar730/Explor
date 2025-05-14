import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MdLockOutline, MdPersonOutline } from "react-icons/md";

function Login({ setCurrentUser }) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const { token, user } = data;

        localStorage.setItem("token", token);
        setCurrentUser(user);
        navigate("/"); // or wherever you want to redirect
      } else {
        setErrors(data.errors || ["Invalid credentials"]);
      }
    } catch (err) {
      setErrors(["Network error. Please try again later."]);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-orange-50 to-white py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Log in to continue your exploration journey</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
        >
          {errors.length > 0 && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
              {errors.map((err, index) => (
                <p key={index} className="text-red-600 text-sm">
                  {err}
                </p>
              ))}
            </div>
          )}

          <div className="mb-6">
            <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-2">
              Username
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">
                <MdPersonOutline className="text-xl" />
              </span>
              <input
                id="username"
                type="text"
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FB8500] focus:border-[#FB8500] outline-none transition-colors"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="block text-gray-700 text-sm font-medium">
                Password
              </label>
              <a href="#" className="text-sm text-[#FB8500] hover:text-orange-600">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">
                <MdLockOutline className="text-xl" />
              </span>
              <input
                id="password"
                type="password"
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FB8500] focus:border-[#FB8500] outline-none transition-colors"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex items-center mb-6">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 border-gray-300 rounded text-[#FB8500] focus:ring-[#FB8500]"
            />
            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#FB8500] text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FB8500] font-medium"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              "Log In"
            )}
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#FB8500] hover:text-orange-600 font-medium">
                Sign up now
              </Link>
            </p>
          </div>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-orange-50 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.59 22.56 12.25Z" fill="#4285F4" />
                <path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.57C14.73 18.23 13.48 18.63 12 18.63C9.19 18.63 6.8 16.76 5.93 14.21H2.25V17.07C4.06 20.62 7.76 23 12 23Z" fill="#34A853" />
                <path d="M5.93 14.21C5.7 13.55 5.57 12.84 5.57 12.11C5.57 11.38 5.7 10.67 5.93 10.01V7.15H2.25C1.46 8.71 1 10.36 1 12.11C1 13.86 1.46 15.51 2.25 17.07L5.93 14.21Z" fill="#FBBC05" />
                <path d="M12 5.59C13.62 5.59 15.06 6.12 16.21 7.23L19.36 4.08C17.45 2.29 14.97 1.11 12 1.11C7.76 1.11 4.06 3.49 2.25 7.04L5.93 9.9C6.8 7.35 9.19 5.59 12 5.59Z" fill="#EA4335" />
              </svg>
              Google
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073C24 5.405 18.627 0 12 0C5.373 0 0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24V15.563H7.078V12.073H10.125V9.41C10.125 6.386 11.917 4.715 14.658 4.715C15.97 4.715 17.344 4.951 17.344 4.951V7.922H15.83C14.339 7.922 13.875 8.853 13.875 9.806V12.073H17.202L16.67 15.563H13.875V24C19.612 23.094 24 18.1 24 12.073Z" />
              </svg>
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;