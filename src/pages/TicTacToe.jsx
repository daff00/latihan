import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const calculateWinner = (sq) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let l of lines) {
      if (sq[l[0]] && sq[l[0]] === sq[l[1]] && sq[l[0]] === sq[l[2]])
        return { winner: sq[l[0]], line: l };
    }
    return null;
  };

  const winInfo = calculateWinner(board);
  const winner = winInfo?.winner;

  const handleClick = (i) => {
    if (winner || board[i]) return;
    const next = [...board];
    next[i] = isXNext ? "X" : "O";
    setBoard(next);
    setIsXNext(!isXNext);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-slate-950 flex flex-col items-center pt-32 px-4 relative overflow-visible text-white"
    >
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header - Fixed Position with pb-2 for 'gy' tail room */}
      <div className="text-center space-y-2 mb-12 z-10">
        <h1 className="text-5xl font-bold tracking-tighter bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent pb-2 leading-tight">
          Precision Strategy
        </h1>
        <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">
          Zero-Sum Logic
        </p>
      </div>

      {/* Main Game Card */}
      <motion.div className="relative z-10 bg-white/5 backdrop-blur-3xl border border-white/10 p-6 rounded-[2.5rem] shadow-2xl">
        <div className="flex justify-between items-center mb-6 px-2">
          <span className="text-sm font-bold uppercase tracking-widest text-slate-400">
            {winner ? `Winner: ${winner}` : `Turn: ${isXNext ? "X" : "O"}`}
          </span>
          <button
            onClick={() => setBoard(Array(9).fill(null))}
            className="text-xs font-bold uppercase py-1 px-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            Reset
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {board.map((val, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleClick(i)}
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border flex items-center justify-center text-4xl font-black ${
                winInfo?.line.includes(i) 
                  ? "border-cyan-500 bg-cyan-500/10 shadow-[0_0_20px_rgba(34,211,238,0.2)]" 
                  : "border-white/5 bg-white/5"
              }`}
            >
              <AnimatePresence>
                {val && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={val === "X" ? "text-cyan-400" : "text-purple-400"}
                  >
                    {val}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}