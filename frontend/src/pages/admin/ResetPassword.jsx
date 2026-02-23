import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: "",
    color: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (error) setError("");
    
    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    let score = 0;
    let message = "";
    let color = "";

    if (password.length >= 8) score += 1;
    if (password.match(/[a-z]/)) score += 1;
    if (password.match(/[A-Z]/)) score += 1;
    if (password.match(/[0-9]/)) score += 1;
    if (password.match(/[^a-zA-Z0-9]/)) score += 1;

    if (password.length === 0) {
      message = "";
      color = "";
    } else if (score <= 2) {
      message = "Weak password";
      color = "#dc2626";
    } else if (score <= 3) {
      message = "Fair password";
      color = "#f59e0b";
    } else if (score <= 4) {
      message = "Good password";
      color = "#3BC0E9";
    } else {
      message = "Strong password";
      color = "#10b981";
    }

    setPasswordStrength({ score, message, color });
  };

  const validateForm = () => {
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const submit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError("");

    try {
      await api.post(`/auth/reset-password/${token}`, { 
        password: form.password 
      });
      setIsSubmitted(true);
      
      // Auto-redirect after 3 seconds
      setTimeout(() => {
        navigate("/login", {
          state: {
            message: "Password reset successful! Please sign in with your new password."
          }
        });
      }, 3000);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Failed to reset password. The link may have expired."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#FFFF' }}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#3BC0E9]/10 border border-[#3BC0E9]/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#3BC0E9] mr-2 animate-pulse"></span>
            <span className="text-xs font-medium text-[#242B38] uppercase tracking-wider">
              Create New Password
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#242B38' }}>
            Reset Password
          </h1>
          <p className="text-sm" style={{ color: '#95BDCB' }}>
            Choose a strong password for your account
          </p>
        </div>

        {/* Success State */}
        {isSubmitted ? (
          <div 
            className="p-8 rounded-2xl text-center"
            style={{ 
              backgroundColor: '#FFFF',
              border: '1px solid #95BDCB',
              boxShadow: '0 4px 20px rgba(59, 192, 233, 0.08)'
            }}
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-50 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#242B38' }}>
              Password Reset Successful!
            </h2>
            <p className="text-sm mb-4" style={{ color: '#95BDCB' }}>
              Your password has been updated successfully.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm">
              <svg className="animate-spin h-4 w-4 text-[#3BC0E9]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span style={{ color: '#3BC0E9' }}>Redirecting to login...</span>
            </div>
          </div>
        ) : (
          /* Form */
          <div 
            className="p-8 rounded-2xl"
            style={{ 
              backgroundColor: '#FFFF',
              border: '1px solid #95BDCB',
              boxShadow: '0 4px 20px rgba(59, 192, 233, 0.08)'
            }}
          >
            {/* Info Box */}
            <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(59, 192, 233, 0.05)' }}>
              <p className="text-sm" style={{ color: '#242B38' }}>
                Please enter your new password below. Make sure it's at least 6 characters long and includes a mix of letters and numbers.
              </p>
            </div>

            <form onSubmit={submit} className="space-y-5">
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

              {/* New Password Field */}
              <div>
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: '#242B38' }}
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter new password"
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all pr-12"
                    style={{ 
                      borderColor: error ? '#f87171' : '#95BDCB',
                      color: '#242B38',
                      backgroundColor: '#FFFF'
                    }}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#3BC0E9] transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isSubmitting}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {form.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs" style={{ color: passwordStrength.color }}>
                        {passwordStrength.message}
                      </span>
                      <span className="text-xs text-gray-400">
                        {passwordStrength.score}/5
                      </span>
                    </div>
                    <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full transition-all duration-300"
                        style={{ 
                          width: `${(passwordStrength.score / 5) * 100}%`,
                          backgroundColor: passwordStrength.color 
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label 
                  htmlFor="confirmPassword" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: '#242B38' }}
                >
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter new password"
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all pr-12"
                    style={{ 
                      borderColor: form.password && form.confirmPassword && form.password !== form.confirmPassword 
                        ? "#dc2626" 
                        : "#95BDCB",
                      color: '#242B38',
                      backgroundColor: '#FFFF'
                    }}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#3BC0E9] transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isSubmitting}
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {form.password && form.confirmPassword && form.password !== form.confirmPassword && (
                  <p className="mt-1 text-xs text-red-600">Passwords do not match</p>
                )}
              </div>

              {/* Password Requirements */}
              <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(59, 192, 233, 0.05)' }}>
                <p className="text-xs font-medium mb-2" style={{ color: '#242B38' }}>Password requirements:</p>
                <ul className="space-y-1 text-xs" style={{ color: '#95BDCB' }}>
                  <li className="flex items-center">
                    <span className={form.password.length >= 6 ? "text-green-500 mr-2" : "text-gray-400 mr-2"}>
                      {form.password.length >= 6 ? "✓" : "○"}
                    </span>
                    At least 6 characters
                  </li>
                  <li className="flex items-center">
                    <span className={form.password.match(/[a-z]/) ? "text-green-500 mr-2" : "text-gray-400 mr-2"}>
                      {form.password.match(/[a-z]/) ? "✓" : "○"}
                    </span>
                    At least one lowercase letter
                  </li>
                  <li className="flex items-center">
                    <span className={form.password.match(/[A-Z]/) ? "text-green-500 mr-2" : "text-gray-400 mr-2"}>
                      {form.password.match(/[A-Z]/) ? "✓" : "○"}
                    </span>
                    At least one uppercase letter (optional)
                  </li>
                  <li className="flex items-center">
                    <span className={form.password.match(/[0-9]/) ? "text-green-500 mr-2" : "text-gray-400 mr-2"}>
                      {form.password.match(/[0-9]/) ? "✓" : "○"}
                    </span>
                    At least one number (optional)
                  </li>
                </ul>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !form.password || !form.confirmPassword}
                className="w-full py-3 rounded-lg font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                style={{ 
                  backgroundColor: '#3BC0E9',
                  color: '#FFFF'
                }}
              >
                {isSubmitting ? (
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
                      />
                      <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Resetting...
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>

            {/* Back to Login */}
            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="inline-flex items-center text-sm font-medium hover:underline transition-all"
                style={{ color: '#3BC0E9' }}
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Sign In
              </Link>
            </div>
          </div>
        )}

        {/* Help Text */}
        <div className="text-center mt-8">
          <p className="text-xs" style={{ color: '#95BDCB' }}>
            Having trouble?{' '}
            <a 
              href="/contact" 
              className="font-medium hover:underline"
              style={{ color: '#3BC0E9' }}
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}