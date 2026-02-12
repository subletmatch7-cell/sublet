import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      await login({ email, password });
  
      const user = JSON.parse(localStorage.getItem("user"));
  
      if (user?.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user?.role === "lister") {
        navigate("/lister/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err.message ||
        "Login failed. Please check your credentials."
      );
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#FFFF' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#242B38' }}>Welcome Back</h1>
          <p className="text-sm" style={{ color: '#95BDCB' }}>Sign in to your account</p>
        </div>

        <form 
          onSubmit={handleSubmit}
          className="space-y-6 p-8 rounded-2xl"
          style={{ 
            backgroundColor: '#FFFF',
            border: '1px solid #95BDCB',
            boxShadow: '0 4px 20px rgba(59, 192, 233, 0.08)'
          }}
        >
          {/* Error Message */}
          {error && (
            <div 
              className="p-3 rounded-lg text-sm"
              style={{ 
                backgroundColor: 'rgba(220, 38, 38, 0.1)',
                border: '1px solid #fecaca',
                color: '#dc2626'
              }}
            >
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium mb-2"
                style={{ color: '#242B38' }}
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                style={{ 
                  borderColor: error ? '#f87171' : '#95BDCB',
                  color: '#242B38',
                  backgroundColor: '#FFFF'
                }}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                required
                disabled={loading}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium"
                  style={{ color: '#242B38' }}
                >
                  Password
                </label>
                <a 
                  href="/forgot-password" 
                  className="text-sm hover:underline transition-all disabled:opacity-50"
                  style={{ color: '#3BC0E9' }}
                  onClick={(e) => loading && e.preventDefault()}
                >
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                style={{ 
                  borderColor: error ? '#f87171' : '#95BDCB',
                  color: '#242B38',
                  backgroundColor: '#FFFF'
                }}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                required
                disabled={loading}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-3 rounded-lg font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
            style={{ 
              backgroundColor: '#3BC0E9',
              color: '#FFFF'
            }}
            disabled={!email || !password || loading}
          >
            {loading ? (
              <>
                <svg 
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  ></circle>
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" style={{ borderColor: '#95BDCB' }}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2" style={{ backgroundColor: '#FFFF', color: '#95BDCB' }}>
                Or continue with
              </span>
            </div>
          </div>

          <button 
            type="button"
            className="w-full py-3 rounded-lg font-medium border transition-all hover:bg-gray-50 active:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              borderColor: '#95BDCB',
              color: '#242B38'
            }}
            disabled={loading}
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
            </div>
          </button>
        </form>

        <div className="text-center mt-8">
          <p className="text-sm" style={{ color: '#95BDCB' }}>
            Don't have an account?{" "}
            <a 
              href="/register" 
              className="font-medium hover:underline transition-all disabled:opacity-50"
              style={{ color: '#3BC0E9' }}
              onClick={(e) => loading && e.preventDefault()}
            >
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}