import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import CounterPage from "./pages/CounterPage";
import TicTacToe from "./pages/TicTacToe";
import Calculator from "./pages/CalculatorPage";
import TodoListPage from "./pages/ToDoListPage";

function App() {
  const location = useLocation();

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen transition-colors duration-500">
      <Navbar />
      
      {/* AnimatePresence manages the exit/entry lifecycle */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/counter" element={<CounterPage />} />
          <Route path="/tictactoe" element={<TicTacToe />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/todo" element={<TodoListPage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;