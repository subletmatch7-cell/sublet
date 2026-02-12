import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "renter"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#FFFF' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#242B38' }}>Join Our Community</h1>
          <p className="text-gray-600" style={{ color: '#95BDCB' }}>Create your account to get started</p>
        </div>

        <form 
          onSubmit={handleSubmit}
          className="space-y-6 p-8 rounded-2xl shadow-lg"
          style={{ 
            backgroundColor: '#FFFF',
            border: '1px solid #95BDCB',
            boxShadow: '0 4px 20px rgba(59, 192, 233, 0.08)'
          }}
        >
          <div className="space-y-4">
            <div>
              <label 
                htmlFor="name" 
                className="block text-sm font-medium mb-1"
                style={{ color: '#242B38' }}
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                style={{ 
                  borderColor: '#95BDCB',
                  color: '#242B38',
                  backgroundColor: '#FFFF'
                }}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium mb-1"
                style={{ color: '#242B38' }}
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                style={{ 
                  borderColor: '#95BDCB',
                  color: '#242B38',
                  backgroundColor: '#FFFF'
                }}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium mb-1"
                style={{ color: '#242B38' }}
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a strong password"
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                style={{ 
                  borderColor: '#95BDCB',
                  color: '#242B38',
                  backgroundColor: '#FFFF'
                }}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label 
                htmlFor="role" 
                className="block text-sm font-medium mb-1"
                style={{ color: '#242B38' }}
              >
                I want to
              </label>
              <select
                id="role"
                name="role"
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all appearance-none"
                style={{ 
                  borderColor: '#95BDCB',
                  color: '#242B38',
                  backgroundColor: '#FFFF'
                }}
                onChange={handleChange}
              >
                <option value="renter">Rent a property</option>
                <option value="lister">List a property</option>
              </select>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-3 rounded-lg font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ 
              backgroundColor: '#3BC0E9',
              color: '#FFFF'
            }}
          >
            Create Account
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm" style={{ color: '#95BDCB' }}>
            Already have an account?{" "}
            <a 
              href="/login" 
              className="font-medium hover:underline transition-all"
              style={{ color: '#3BC0E9' }}
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}