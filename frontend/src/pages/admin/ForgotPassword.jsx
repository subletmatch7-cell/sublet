import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const submit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await api.post("/auth/forgot-password", { email });
      setIsSubmitted(true);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Something went wrong. Please try again."
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
              Password Reset
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#242B38' }}>
            Forgot Password?
          </h1>
          <p className="text-sm" style={{ color: '#95BDCB' }}>
            No worries — we'll send you reset instructions
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#242B38' }}>
              Check Your Email
            </h2>
            <p className="text-sm mb-6" style={{ color: '#95BDCB' }}>
              We've sent a password reset link to <br />
              <span className="font-medium text-[#3BC0E9]">{email}</span>
            </p>
            <p className="text-xs text-gray-500 mb-4">
              Didn't receive it? Check your spam folder or try again.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-sm font-medium hover:underline"
              style={{ color: '#3BC0E9' }}
            >
              Try another email
            </button>
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
                Enter your email address and we'll send you a link to reset your password.
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

              {/* Email Field */}
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: '#242B38' }}
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5" style={{ color: '#95BDCB' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="you@example.com"
                    required
                    disabled={isSubmitting}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                      borderColor: error ? '#f87171' : '#95BDCB',
                      color: '#242B38',
                      backgroundColor: '#FFFF'
                    }}
                  />
                </div>
                <p className="mt-1 text-xs" style={{ color: '#95BDCB' }}>
                  We'll never share your email with anyone else.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !email}
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
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
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