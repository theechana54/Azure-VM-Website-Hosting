import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [booted, setBooted] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 900);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden px-4">
      {/* grid background */}
      <div
        className="absolute inset-0 animate-grid-pulse"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.15) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="absolute w-[400px] h-[400px] bg-indigo-600/30 rounded-full blur-[120px] top-1/4 left-1/4" />
      <div className="absolute w-[350px] h-[350px] bg-fuchsia-600/30 rounded-full blur-[120px] bottom-1/4 right-1/4" />

      <div className="relative z-10 w-full max-w-md">
        <div className="relative bg-black/60 border border-cyan-400/20 rounded-2xl p-8 backdrop-blur-md animate-border-glow overflow-hidden">
          {/* scan line */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent animate-scan-line" />
          </div>

          <div className="text-center mb-8">
            <div className="text-4xl mb-2">🎓</div>
            <p className="text-cyan-300 text-xs tracking-[0.3em] mb-2 animate-type-in">
              SYSTEM AUTHENTICATION
            </p>
            <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-amber-300">
              STUDENT MANAGEMENT SYSTEM
            </h1>
            <p className="text-gray-500 text-xs mt-2 tracking-wider">
              &gt; enter credentials to continue_
            </p>
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center mb-4">{error}</p>
          )}

          {booted && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="animate-field-reveal" style={{ animationDelay: "0.05s" }}>
                <label className="text-cyan-300/70 text-xs tracking-widest mb-1 block">
                  EMAIL
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400/60 font-mono text-sm"
                />
              </div>
              <div className="animate-field-reveal" style={{ animationDelay: "0.2s" }}>
                <label className="text-cyan-300/70 text-xs tracking-widest mb-1 block">
                  PASSWORD
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-fuchsia-400/60 font-mono text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-400 text-black font-bold tracking-wide hover:opacity-90 transition animate-field-reveal"
                style={{ animationDelay: "0.35s" }}
              >
                AUTHENTICATE →
              </button>
            </form>
          )}

          <p className="text-gray-500 text-sm text-center mt-6">
            No account?{" "}
            <Link to="/register" className="text-cyan-300 font-medium">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;