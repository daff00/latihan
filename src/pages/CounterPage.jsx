import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CounterPage() {
  const [counter, setCounter] = useState(() => {
    const saved = localStorage.getItem("counter");
    return saved ? Number(saved) : 0;
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("counter", counter.toString());
  }, [counter]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowUp") setCounter((p) => p + 1);
      if (e.key === "ArrowDown") setCounter((p) => p - 1);
      if (e.key.toLowerCase() === "r") setCounter(0);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const emoji = counter > 0 ? "🚀" : counter < 0 ? "📉" : "✨";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex flex-col items-center pt-12 pb-32 sm:pt-32 sm:pb-12 px-4 relative overflow-hidden"
    >
      <motion.div
        animate={{
          backgroundColor:
            counter > 0 ? "#22d3ee" : counter < 0 ? "#a855f7" : "#64748b",
        }}
        className="absolute w-[600px] h-[600px] rounded-full blur-[140px] -top-40 -right-40 opacity-20 dark:opacity-10 transition-colors duration-700 pointer-events-none"
      />

      <div className="text-center space-y-2 mb-12 z-10">
        <h1 className="text-5xl font-bold tracking-tighter bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
          Precision Counter
        </h1>
        <p className="text-slate-600 dark:text-slate-500 text-sm font-medium uppercase tracking-widest">
          Interactive Session
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center space-y-6 w-full max-w-md px-6">
        <div className="w-full aspect-square max-h-[300px] flex flex-col items-center justify-center rounded-[3rem] bg-slate-200/50 dark:bg-white/5 backdrop-blur-3xl border border-slate-300 dark:border-white/10 shadow-2xl relative overflow-hidden transition-colors duration-500">
          <div className="absolute top-6 text-4xl">{emoji}</div>
          <AnimatePresence mode="wait">
            <motion.h2
              key={counter}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="text-9xl font-black tracking-tighter text-slate-800 dark:text-white"
            >
              {counter}
            </motion.h2>
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-5 gap-2 w-full p-2 bg-slate-200/50 dark:bg-white/5 rounded-2xl border border-slate-300 dark:border-white/5 backdrop-blur-md transition-colors duration-500">
          <button
            onClick={() => setCounter((p) => p - 2)}
            className="flex-1 py-3 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            -2
          </button>
          <button
            onClick={() => setCounter((p) => p - 1)}
            className="flex-1 py-3 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            -1
          </button>
          <button
            onClick={() => setCounter(0)}
            className="px-4 py-3 rounded-xl bg-slate-300/50 dark:bg-white/10 text-slate-800 dark:text-white text-xs font-bold uppercase transition-colors"
          >
            Reset
          </button>
          <button
            onClick={() => setCounter((p) => p + 1)}
            className="flex-1 py-3 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            +1
          </button>
          <button
            onClick={() => setCounter((p) => p + 2)}
            className="flex-1 py-3 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            +2
          </button>
        </div>

        <div className="w-full space-y-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Identity label..."
            className="w-full px-6 py-4 rounded-2xl bg-slate-200/50 dark:bg-slate-900/50 border border-slate-300 dark:border-white/10 focus:border-cyan-500/50 outline-none transition-all text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
          />

          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full px-6 py-4 text-center rounded-2xl bg-slate-200/50 dark:bg-white/5 border border-slate-300 dark:border-white/10 shadow-md backdrop-blur-md transition-colors duration-500 font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400"
              >
                {message}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
