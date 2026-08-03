const icons = ["🎓", "📚", "✏️", "📝", "🏆", "📐", "🔬", "💡"];

const AuthBackground = () => {
  const items = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    icon: icons[i % icons.length],
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 12 + Math.random() * 10,
    size: 20 + Math.random() * 24,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-pink-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "0.7s" }} />

      {items.map((item) => (
        <span
          key={item.id}
          className="absolute opacity-20 select-none"
          style={{
            left: `${item.left}%`,
            fontSize: `${item.size}px`,
            animation: `floatUp ${item.duration}s linear ${item.delay}s infinite`,
          }}
        >
          {item.icon}
        </span>
      ))}

      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(110vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.25; }
          90% { opacity: 0.25; }
          100% { transform: translateY(-10vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default AuthBackground;