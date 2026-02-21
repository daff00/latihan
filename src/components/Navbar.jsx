import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeContext";
import { Sun, Moon } from "lucide-react";

const links = [
  { path: "/", label: "Home" },
  { path: "/counter", label: "Counter" },
  { path: "/tictactoe", label: "TicTacToe" },
  { path: "/calculator", label: "Calculator" },
  { path: "/todo", label: "Todo" },
];

export default function Navbar() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    // Berubah dari fixed top-6 menjadi responsif (bawah di HP, atas di PC)
    <div className="fixed bottom-6 sm:bottom-auto sm:top-6 left-0 w-full flex justify-center z-50 px-2 sm:px-4">
      <nav className="flex items-center gap-1 sm:gap-2 p-2 bg-slate-100/80 dark:bg-slate-950/80 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-full shadow-2xl transition-colors duration-500 overflow-x-auto no-scrollbar max-w-full">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `relative px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium transition-colors duration-300 rounded-full outline-none whitespace-nowrap shrink-0 ${
                isActive 
                  ? "text-slate-900 dark:text-white" 
                  : "text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-slate-200"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="relative z-10">{link.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-cyan-500/10 dark:bg-gradient-to-r dark:from-cyan-500/20 dark:to-purple-500/20 border border-cyan-500/20 dark:border-cyan-500/30 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}

        {/* Separator */}
        <div className="w-[1px] h-6 bg-slate-300 dark:bg-white/10 mx-1 sm:mx-2 shrink-0" />

        {/* Theme Toggle Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className="p-2 shrink-0 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-white/10 transition-colors"
        >
          {isDarkMode ? <Moon size={18} className="text-indigo-400" /> : <Sun size={18} className="text-yellow-500" />}
        </motion.button>
      </nav>
    </div>
  );
}