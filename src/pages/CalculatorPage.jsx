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
      // Standard Page Transition
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      // Standardized Layout for Header Consistency
      className="min-h-screen bg-slate-950 flex flex-col items-center pt-32 px-4 relative overflow-hidden text-white"
    >
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header - Locked Position */}
      <div className="text-center space-y-2 mb-12 z-10">
        <h1 className="text-5xl font-bold tracking-tighter bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Precision Compute
        </h1>
        <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">
          Calculated Logic
        </p>
      </div>

      {/* Content */}
      <motion.div className="relative z-10 w-full max-w-sm bg-white/5 backdrop-blur-3xl border border-white/10 p-8 rounded-[3rem] shadow-2xl">
        <div className="flex flex-col items-end justify-end h-24 mb-6 px-4 overflow-hidden">
          <p className="text-slate-500 text-sm truncate w-full text-right">
            {equation}
          </p>
          <AnimatePresence mode="wait">
            <motion.h1
              key={display}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-5xl font-light"
            >
              {display}
            </motion.h1>
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {["AC", "+/-", "%", "÷"].map((btn) => (
            <button
              key={btn}
              onClick={
                btn === "AC"
                  ? () => {
                      setDisplay("0");
                      setEquation("");
                    }
                  : undefined
              }
              className="h-14 rounded-xl bg-slate-800/40 text-slate-300"
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
              className="h-14 rounded-xl bg-white/5"
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
              className="h-14 rounded-xl bg-white/5"
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
              className="h-14 rounded-xl bg-white/5"
            >
              {btn}
            </button>
          ))}
          <button
            onClick={() => handleNumber("0")}
            className="col-span-2 h-14 rounded-xl bg-white/5"
          >
            0
          </button>
          <button
            onClick={() => handleNumber(".")}
            className="h-14 rounded-xl bg-white/5"
          >
            .
          </button>
          <button
            onClick={calculate}
            className="h-14 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500"
          >
            =
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
