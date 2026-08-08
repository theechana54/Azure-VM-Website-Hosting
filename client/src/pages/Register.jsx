import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: "#0F172A",
        backgroundImage:
          "radial-gradient(circle at 15% 20%, rgba(34,211,238,0.15), transparent 40%), radial-gradient(circle at 85% 80%, rgba(99,102,241,0.18), transparent 40%), linear-gradient(rgba(148,163,184,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.07) 1px, transparent 1px)",
        backgroundSize: "auto, auto, 28px 28px, 28px 28px",
      }}
    >
      {/* floating code tag */}
      <div className="absolute top-8 left-8 text-cyan-400 font-mono text-2xl font-bold opacity-70">
        &lt;/&gt;
      </div>
      <div className="absolute top-10 left-20 text-slate-500 font-mono text-xs tracking-widest opacity-70">
        MERN STACK
      </div>

      <div className="relative z-10 bg-slate-800/70 backdrop-blur-xl border border-cyan-500/20 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-6">
          <div className="mx-auto mb-3 w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center text-2xl font-mono font-bold text-white">
            {"{ }"}
          </div>
          <h1 className="text-2xl font-bold text-white">Create Account</h1>
          <p className="text-slate-400 mt-1 font-mono text-sm">// register to get started</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/40 text-red-300 px-4 py-2 rounded-md mb-4 text-sm font-mono">
            ERROR: {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-medium mb-1 text-cyan-400">FULL_NAME</label>
            <input
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-mono font-medium mb-1 text-cyan-400">EMAIL</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-mono font-medium mb-1 text-cyan-400">PASSWORD</label>
            <input
              type="password"
              name="password"
              required
              minLength={6}
              value={form.password}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-mono font-medium mb-1 text-cyan-400">ROLE</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono text-sm"
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white py-2 rounded-md font-semibold hover:opacity-90 transition disabled:opacity-50 font-mono text-sm"
          >
            {loading ? "creating_account()..." : "register()"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-4 font-mono">
          have_account ?{" "}
          <Link to="/login" className="text-cyan-400 font-semibold underline">
            login()
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
