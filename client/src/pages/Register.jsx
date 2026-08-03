import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthBackground from "../components/AuthBackground";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form.name, form.email, form.password, form.role);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <AuthBackground />

      <div className="relative z-10 bg-white/15 backdrop-blur-xl border border-white/30 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">📝</div>
          <h1 className="text-2xl font-bold text-white drop-shadow">Create Account</h1>
          <p className="text-white/80 mt-1">Register to get started</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-300/50 text-white px-4 py-2 rounded-md mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-white/90">Full Name</label>
            <input
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full bg-white/20 border border-white/30 rounded-md px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/60"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-white/90">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full bg-white/20 border border-white/30 rounded-md px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/60"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-white/90">Password</label>
            <input
              type="password"
              name="password"
              required
              minLength={6}
              value={form.password}
              onChange={handleChange}
              className="w-full bg-white/20 border border-white/30 rounded-md px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/60"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-white/90">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full bg-white/20 border border-white/30 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/60"
            >
              <option value="user" className="text-black">User</option>
              <option value="admin" className="text-black">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-indigo-700 py-2 rounded-md font-semibold hover:bg-white/90 transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-white/80 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-white font-semibold underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;