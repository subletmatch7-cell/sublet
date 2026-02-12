import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#FFFF" }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: "#242B38" }}
          >
            Become a Lister
          </h1>
          <p className="text-sm" style={{ color: "#95BDCB" }}>
            Create an account to list and manage properties
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-8 rounded-2xl"
          style={{
            backgroundColor: "#FFFF",
            border: "1px solid #95BDCB",
            boxShadow: "0 4px 20px rgba(59, 192, 233, 0.08)"
          }}
        >
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
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: "#242B38" }}
              >
                Full Name
              </label>
              <input
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg border"
                style={{
                  borderColor: "#95BDCB",
                  backgroundColor: "#FFFF"
                }}
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: "#242B38" }}
              >
                Email Address
              </label>
              <input
                name="email"
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg border"
                style={{
                  borderColor: "#95BDCB",
                  backgroundColor: "#FFFF"
                }}
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: "#242B38" }}
              >
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="Create a strong password"
                value={form.password}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg border"
                style={{
                  borderColor: "#95BDCB",
                  backgroundColor: "#FFFF"
                }}
              />
            </div>
          </div>

          <label className="flex items-start gap-2 text-sm text-gray-600 font-light">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span>
              I have read and understand{" "}
              <a href="/terms" className="text-blue-600 font-semibold">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="/privacy-policy" className="text-blue-600 font-semibold">
                Privacy Policy
              </a>
            </span>
          </label>

          <button
            type="submit"
            disabled={loading || !form.name || !form.email || !form.password}
            className="w-full py-3 rounded-lg font-medium text-white"
            style={{ backgroundColor: "#3BC0E9" }}
          >
            {loading ? "Creating account..." : "Create Lister Account"}
          </button>

          

        </form>

        <div className="text-center mt-6">
          <p className="text-sm" style={{ color: "#95BDCB" }}>
            Already a lister?{" "}
            <a
              href="/login"
              className="font-medium hover:underline"
              style={{ color: "#3BC0E9" }}
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
