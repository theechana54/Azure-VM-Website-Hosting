import { useEffect, useState } from "react";

const BOOT_LINES = [
  "> Initializing system core...",
  "> Loading authentication module...",
  "> Connecting to database...",
  "> Verifying security protocols...",
  "> Access Granted ✓",
];

const SplashScreen = ({ onFinish }) => {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    const lineTimers = BOOT_LINES.map((_, i) =>
      setTimeout(() => setLineCount(i + 1), 350 + i * 380)
    );
    const glitchTimer = setTimeout(() => setGlitch(true), 2300);
    const fadeTimer = setTimeout(() => setFadeOut(true), 2700);
    const removeTimer = setTimeout(() => {
      setVisible(false);
      onFinish?.();
    }, 3200);

    return () => {
      lineTimers.forEach(clearTimeout);
      clearTimeout(glitchTimer);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [onFinish]);

  if (!visible) return null;

  const particles = Array.from({ length: 25 });

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.3) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* floating particles */}
      {particles.map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-cyan-300/70 animate-particle"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: `${Math.random() * 20}%`,
            animationDuration: `${3 + Math.random() * 4}s`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}

      <div className="absolute w-[500px] h-[500px] bg-indigo-600/40 rounded-full blur-[100px] animate-pulse top-1/4 left-1/4" />
      <div
        className="absolute w-[400px] h-[400px] bg-fuchsia-600/40 rounded-full blur-[100px] animate-pulse bottom-1/4 right-1/4"
        style={{ animationDelay: "0.6s" }}
      />

      <div className="relative z-10 text-center px-6 w-full max-w-lg">
        <div className="text-6xl mb-4 animate-splash-icon">🎓</div>

        <h1
          className={`text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-amber-300 animate-splash-text ${
            glitch ? "animate-glitch" : ""
          }`}
        >
          STUDENT
        </h1>
        <h1
          className={`text-4xl md:text-6xl font-black tracking-tight text-white animate-splash-text ${
            glitch ? "animate-glitch" : ""
          }`}
          style={{ animationDelay: "0.15s" }}
        >
          MANAGEMENT SYSTEM
        </h1>

        {/* boot terminal */}
        <div className="mt-8 text-left bg-white/5 border border-cyan-400/20 rounded-xl px-5 py-4 font-mono text-xs md:text-sm min-h-[130px]">
          {BOOT_LINES.slice(0, lineCount).map((line, i) => (
            <p key={i} className="text-cyan-300/90 mb-1 animate-boot-line">
              {line}
            </p>
          ))}
          <span className="inline-block w-2 h-3 bg-cyan-300 animate-cursor align-middle" />
        </div>

        {/* progress bar */}
        <div className="mt-5 h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-400 animate-progress-fill" />
        </div>

        <p className="text-gray-500 mt-3 text-[11px] tracking-[0.3em]">
          LOADING YOUR DASHBOARD...
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;