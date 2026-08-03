import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import PageWrapper from "../components/PageWrapper";

const API_BASE = "http://localhost:5000/api";

const getAuthHeaders = () => {
  const stored = localStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;
  const token = user?.token;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const useCountUp = (target, duration = 1200) => {
  const [value, setValue] = useState(0);
  const raf = useRef(null);

  useEffect(() => {
    const start = performance.now();
    const numericTarget = typeof target === "number" ? target : 0;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.floor(progress * numericTarget));
      if (progress < 1) raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);

  return typeof target === "number" ? value : target;
};

const StatCard = ({ label, value, icon, color, suffix = "" }) => {
  const displayValue = useCountUp(typeof value === "number" ? value : 0);
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover-scan transition">
      <div className="text-3xl mb-3">{icon}</div>
      <p className="text-gray-400 text-sm">{label}</p>
      <p className={`text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${color} font-mono`}>
        {value === undefined || value === null ? "—" : `${displayValue}${suffix}`}
      </p>
    </div>
  );
};

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [clock, setClock] = useState(new Date());
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API_BASE}/students/stats/dashboard`, {
          headers: getAuthHeaders(),
        });
        setStats(res.data);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load stats");
      }
    };
    fetchStats();

    const timer = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const cards = [
    {
      label: "Total Students",
      value: stats.totalStudents ?? stats.total ?? stats.count,
      icon: "👥",
      color: "from-cyan-400 to-blue-500",
    },
    {
      label: "Departments",
      value: stats.totalDepartments ?? stats.departments,
      icon: "📚",
      color: "from-fuchsia-400 to-purple-500",
    },
    {
      label: "Avg Year",
      value: stats.avgYear ?? stats.averageYear,
      icon: "📊",
      color: "from-amber-400 to-orange-500",
    },
  ];

  return (
    <PageWrapper>
      <div className="min-h-screen bg-black relative overflow-hidden">
        <div className="absolute w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl top-0 left-0" />
        <div className="absolute w-80 h-80 bg-fuchsia-600/20 rounded-full blur-3xl bottom-0 right-0" />

        <div className="relative z-10">
          <Navbar clock={clock} />

          <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
              <h2 className="text-2xl md:text-3xl font-black text-white">
                Welcome back 👋
              </h2>
              <span className="text-cyan-300/70 font-mono text-xs tracking-widest">
                {clock.toLocaleTimeString()}
              </span>
            </div>
            <p className="text-gray-400 mb-8 text-sm">
              Here's what's happening today.
            </p>

            {error && (
              <p className="text-red-400 text-sm mb-4">{error}</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {cards.map((c, i) => (
                <StatCard key={i} {...c} />
              ))}
            </div>

            <Link
              to="/students"
              className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-400 text-black font-bold hover-glitch transition"
            >
              Manage Students →
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Dashboard;