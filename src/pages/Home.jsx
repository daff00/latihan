import { motion } from "framer-motion";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";

export default function Home() {
  return (
    <motion.div
      // Page Transition
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      // Centered Layout
      className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 relative overflow-hidden text-white"
    >
      
      {/* Logos Section */}
      <div className="flex space-x-12 sm:space-x-16 mb-12 z-10">
        {/* Vite Logo */}
        <motion.div className="relative group cursor-pointer">
          <div className="absolute inset-0 rounded-full bg-purple-500/40 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <motion.img
            src={viteLogo}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="relative h-20 w-20 sm:h-24 sm:w-24 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
            alt="Vite logo"
          />
        </motion.div>

        {/* React Logo - Spinning */}
        <motion.div className="relative group cursor-pointer">
          <div className="absolute inset-0 rounded-full bg-cyan-400/30 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <motion.img
            src={reactLogo}
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            whileHover={{ scale: 1.1 }}
            className="relative h-20 w-20 sm:h-24 sm:w-24 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]"
            alt="React logo"
          />
        </motion.div>
      </div>

      {/* Wording Section */}
      <div className="text-center space-y-4 z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
            Welcome to the
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400">
            Modern Playground
          </span>
        </h1>

        <p className="max-w-md mx-auto text-slate-400 text-lg md:text-xl font-light leading-relaxed">
          A high-performance React + Vite starter kit equipped with Framer Motion and Tailwind CSS.
        </p>
      </div>

      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] -z-0 pointer-events-none" />
    </motion.div>
  );
}