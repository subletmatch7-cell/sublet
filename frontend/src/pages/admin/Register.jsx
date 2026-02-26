import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "../../components/auth/GoogleButton";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: "",
    color: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (error) setError("");
    
    // Check password strength when password field changes
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
      color = "#dc2626"; // red
    } else if (score <= 3) {
      message = "Fair password";
      color = "#f59e0b"; // yellow
    } else if (score <= 4) {
      message = "Good password";
      color = "#3BC0E9"; // blue
    } else {
      message = "Strong password";
      color = "#10b981"; // green
    }

    setPasswordStrength({ score, message, color });
  };

  const validateForm = () => {
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!termsAccepted) {
      setError("Please accept the Terms & Conditions");
      return false;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      await register({
        ...form,
        role: "lister" // 🔒 force lister role
      });

      navigate("/login", {
        state: {
          message: "Account created! Please sign in to manage your listings."
        }
      });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err.message ||
        "Registration failed. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#FFFF" }}>
      {/* Left Side - About SubletMatch (hidden on mobile, visible on lg screens) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#3BC0E9]/10 to-[#95BDCB]/20 p-12 flex-col justify-between">
        <div>

          <h2 className="text-3xl font-bold mb-6" style={{ color: "#242B38" }}>
            Start Your Journey as a{' '}
            <span className="bg-gradient-to-r from-[#3BC0E9] to-[#95BDCB] bg-clip-text text-transparent">
              Lister
            </span>
          </h2>

          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Join our community of trusted property listers and help students in NYC find their perfect short-term home. 
            We make it easy to list, manage, and connect with verified renters.
          </p>

          <div className="space-y-4 mb-12">
            <div className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-[#3BC0E9]/20 flex items-center justify-center mr-3 mt-0.5">
                <svg className="w-4 h-4 text-[#3BC0E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[#242B38]">Reach Thousands of Renters</h3>
                <p className="text-sm text-gray-600">Get your property in front of verified, quality renters</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-[#3BC0E9]/20 flex items-center justify-center mr-3 mt-0.5">
                <svg className="w-4 h-4 text-[#3BC0E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[#242B38]">Easy Listing Management</h3>
                <p className="text-sm text-gray-600">Simple dashboard to manage all your properties in one place</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-[#3BC0E9]/20 flex items-center justify-center mr-3 mt-0.5">
                <svg className="w-4 h-4 text-[#3BC0E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[#242B38]">Direct Communication</h3>
                <p className="text-sm text-gray-600">Connect directly with interested renters through our platform</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-[#3BC0E9]/20 flex items-center justify-center mr-3 mt-0.5">
                <svg className="w-4 h-4 text-[#3BC0E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[#242B38]">Verified Listings Only</h3>
                <p className="text-sm text-gray-600">Stand out with our verification badge and build trust</p>
              </div>
            </div>
          </div>

          <div className="border-t border-[#95BDCB]/30 pt-8">
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3BC0E9] to-[#95BDCB] flex items-center justify-center ring-2 ring-white">
                  <span className="text-white text-xs font-bold">AJ</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3BC0E9] to-[#95BDCB] flex items-center justify-center ring-2 ring-white">
                  <span className="text-white text-xs font-bold">MK</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3BC0E9] to-[#95BDCB] flex items-center justify-center ring-2 ring-white">
                  <span className="text-white text-xs font-bold">SL</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#242B38]">Join successful listers</p>
                <p className="text-xs text-gray-500">Already earning on SubletMatch</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          © 2024 SubletMatch. All rights reserved.
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-8 lg:py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-6 lg:hidden">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#3BC0E9]/10 border border-[#3BC0E9]/20 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#3BC0E9] mr-2 animate-pulse"></span>
              <span className="text-xs font-medium text-[#242B38] uppercase tracking-wider">
                Become a Lister
              </span>
            </div>
            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: "#242B38" }}
            >
              List Your Apartment
            </h1>
            <p className="text-sm" style={{ color: "#95BDCB" }}>
              Create an account to start posting your properties
            </p>
          </div>

          <div
            className="p-6 md:p-8 rounded-2xl"
            style={{
              backgroundColor: "#FFFF",
              border: "1px solid #95BDCB",
              boxShadow: "0 4px 20px rgba(59, 192, 233, 0.08)"
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div
                  className="p-3 rounded-lg text-sm"
                  style={{
                    backgroundColor: "rgba(220, 38, 38, 0.1)",
                    border: "1px solid #fecaca",
                    color: "#dc2626"
                  }}
                >
                  {error}
                </div>
              )}

              <div className="space-y-4">
                {/* Name Field */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#242B38" }}
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5" style={{ color: '#95BDCB' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#3BC0E9] focus:border-transparent transition-all"
                      style={{
                        borderColor: "#95BDCB",
                        backgroundColor: "#FFFF"
                      }}
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#242B38" }}
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
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#3BC0E9] focus:border-transparent transition-all"
                      style={{
                        borderColor: "#95BDCB",
                        backgroundColor: "#FFFF"
                      }}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#242B38" }}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5" style={{ color: '#95BDCB' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      className="w-full pl-10 pr-12 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#3BC0E9] focus:border-transparent transition-all"
                      style={{
                        borderColor: "#95BDCB",
                        backgroundColor: "#FFFF"
                      }}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#3BC0E9] transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading}
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
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#242B38" }}
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5" style={{ color: '#95BDCB' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter your password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      className="w-full pl-10 pr-12 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#3BC0E9] focus:border-transparent transition-all"
                      style={{
                        borderColor: form.password && form.confirmPassword && form.password !== form.confirmPassword 
                          ? "#dc2626" 
                          : "#95BDCB",
                        backgroundColor: "#FFFF"
                      }}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#3BC0E9] transition-colors"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={loading}
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
              </div>

              {/* Terms Checkbox */}
              <label className="flex items-start gap-2 text-sm text-gray-600 font-light">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 h-4 w-4 text-[#3BC0E9] border-gray-300 rounded focus:ring-[#3BC0E9]"
                />
                <span>
                  I have read and understand{" "}
                  <a href="/terms-of-service" className="font-semibold hover:underline" style={{ color: "#3BC0E9" }}>
                    Terms & Conditions
                  </a>
                </span>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !form.name || !form.email || !form.password || !form.confirmPassword || !termsAccepted}
                className="w-full py-3 rounded-lg font-medium text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                style={{ backgroundColor: "#3BC0E9" }}
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
                      />
                      <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" style={{ borderColor: '#95BDCB' }}></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2" style={{ backgroundColor: '#FFFF', color: '#95BDCB' }}>
                    Or sign up with
                  </span>
                </div>
              </div>

              {/* Google Button */}
              <div className="mt-2">
                <GoogleLoginButton />
              </div>
            </form>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm" style={{ color: "#95BDCB" }}>
              Already a lister?{" "}
              <a
                href="/login"
                className="font-medium hover:underline transition-all"
                style={{ color: "#3BC0E9" }}
              >
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}