import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Check } from "lucide-react";

export default function TodoListPage() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([{ id: Date.now(), text: input.trim(), completed: false }, ...todos]);
    setInput("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex flex-col items-center pt-32 px-4 relative overflow-hidden"
    >
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500/20 dark:bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none transition-colors duration-500" />

      <div className="text-center space-y-2 mb-12 z-10">
        <h1 className="text-5xl font-bold tracking-tighter bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent pb-2 leading-tight">
          Action Items
        </h1>
        <p className="text-slate-600 dark:text-slate-500 text-sm font-medium uppercase tracking-widest">
          Task Management
        </p>
      </div>

      <div className="relative z-10 w-full max-w-md space-y-6">
        <form onSubmit={addTodo} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-6 py-4 rounded-2xl bg-slate-100/60 dark:bg-white/5 border border-slate-300 dark:border-white/10 focus:border-emerald-500/50 outline-none transition-all text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 backdrop-blur-md shadow-lg"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="px-6 py-4 rounded-2xl bg-gradient-to-br from-emerald-600 to-cyan-600 dark:from-emerald-500 dark:to-cyan-500 text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <Plus size={24} />
          </button>
        </form>

        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {todos.map((todo) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                key={todo.id}
                className={`flex items-center gap-3 p-4 rounded-2xl border backdrop-blur-md transition-colors duration-300 shadow-md ${
                  todo.completed
                    ? "bg-slate-200/40 dark:bg-white/5 border-slate-300/50 dark:border-white/5"
                    : "bg-slate-100/80 dark:bg-white/10 border-slate-300 dark:border-white/10"
                }`}
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                    todo.completed
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : "border-slate-400 dark:border-slate-500 hover:border-emerald-500 dark:hover:border-emerald-400"
                  }`}
                >
                  {todo.completed && <Check size={14} strokeWidth={3} />}
                </button>
                
                <span
                  className={`flex-1 text-base transition-all duration-300 ${
                    todo.completed
                      ? "text-slate-500 dark:text-slate-500 line-through"
                      : "text-slate-800 dark:text-slate-200"
                  }`}
                >
                  {todo.text}
                </span>

                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="p-2 text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {todos.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-slate-500 dark:text-slate-400 py-8"
            >
              No tasks pending. You're all caught up!
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
}