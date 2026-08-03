import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-black/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎓</span>
          <h1 className="text-lg md:text-xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-amber-300">
            STUDENT MANAGEMENT SYSTEM
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm hidden sm:block">
            {user?.name || "Admin"}
          </span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-200 text-sm font-medium hover:bg-white/10 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;