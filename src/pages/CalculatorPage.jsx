import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CalculatorPage() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  const handleNumber = (num) => {
    if (display === "0" || isFinished) {
      setDisplay(num);
      setIsFinished(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op) => {
    setEquation(display + " " + op + " ");
    setDisplay("0");
    setIsFinished(false);
  };

  const handleSpecial = (btn) => {
    if (btn === "AC") {
      setDisplay("0");
      setEquation("");
      setIsFinished(false);
    } else if (btn === "+/-") {
      setDisplay((prev) => (Number(prev) * -1).toString());
    } else if (btn === "%") {
      setDisplay((prev) => (Number(prev) / 100).toString());
    } else if (btn === "÷") {
      handleOperator("/");
    }
  };

  const calculate = () => {
    try {
      const result = new Function(`return ${equation + display}`)();
      setEquation(equation + display + " =");
      setDisplay(Number(result.toFixed(4)).toString());
      setIsFinished(true);
    } catch {
      setDisplay("Error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex flex-col items-center pt-12 pb-32 sm:pt-32 sm:pb-12 px-4 relative overflow-hidden"
    >
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 dark:bg-purple-600/10 blur-[120px] rounded-full pointer-events-none transition-colors duration-500" />

      <div className="text-center space-y-2 mb-12 z-10">
        <h1 className="text-5xl font-bold tracking-tighter bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
          Precision Compute
        </h1>
        <p className="text-slate-600 dark:text-slate-500 text-sm font-medium uppercase tracking-widest">
          Calculated Logic
        </p>
      </div>

      <motion.div className="relative z-10 w-full max-w-sm bg-slate-100/60 dark:bg-white/5 backdrop-blur-3xl border border-slate-300 dark:border-white/10 p-8 rounded-[3rem] shadow-2xl transition-colors duration-500">
        <div className="flex flex-col items-end justify-end h-24 mb-6 px-4 overflow-hidden">
          <p className="text-slate-500 dark:text-slate-400 text-sm truncate w-full text-right transition-colors">
            {equation}
          </p>
          <AnimatePresence mode="wait">
            <motion.h1
              key={display}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-5xl font-light text-slate-900 dark:text-white"
            >
              {display}
            </motion.h1>
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {["AC", "+/-", "%", "÷"].map((btn) => (
            <button
              key={btn}
              onClick={() => handleSpecial(btn)}
              className="h-14 rounded-xl bg-slate-300/70 dark:bg-slate-800/40 text-slate-800 dark:text-slate-300 hover:bg-slate-400/70 dark:hover:bg-slate-700/50 transition-colors"
            >
              {btn}
            </button>
          ))}
          {["7", "8", "9", "×"].map((btn) => (
            <button
              key={btn}
              onClick={() =>
                isNaN(btn) ? handleOperator("*") : handleNumber(btn)
              }
              className="h-14 rounded-xl bg-slate-200/80 dark:bg-white/5 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-white/10 transition-colors"
            >
              {btn}
            </button>
          ))}
          {["4", "5", "6", "-"].map((btn) => (
            <button
              key={btn}
              onClick={() =>
                isNaN(btn) ? handleOperator("-") : handleNumber(btn)
              }
              className="h-14 rounded-xl bg-slate-200/80 dark:bg-white/5 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-white/10 transition-colors"
            >
              {btn}
            </button>
          ))}
          {["1", "2", "3", "+"].map((btn) => (
            <button
              key={btn}
              onClick={() =>
                isNaN(btn) ? handleOperator("+") : handleNumber(btn)
              }
              className="h-14 rounded-xl bg-slate-200/80 dark:bg-white/5 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-white/10 transition-colors"
            >
              {btn}
            </button>
          ))}
          <button
            onClick={() => handleNumber("0")}
            className="col-span-2 h-14 rounded-xl bg-slate-200/80 dark:bg-white/5 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-white/10 transition-colors"
          >
            0
          </button>
          <button
            onClick={() => handleNumber(".")}
            className="h-14 rounded-xl bg-slate-200/80 dark:bg-white/5 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-white/10 transition-colors"
          >
            .
          </button>
          <button
            onClick={calculate}
            className="h-14 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-600 dark:from-purple-500 dark:to-cyan-500 text-white hover:opacity-90 transition-opacity"
          >
            =
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}