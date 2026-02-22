import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGithubUser, clearGithubData } from "../store/githubSlice";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Link2, BookOpen, Users, Loader2 } from "lucide-react";

export default function GithubExplorer() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const { profile, repos, status, error } = useSelector(
    (state) => state.github,
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    dispatch(fetchGithubUser(username));
  };

  const handleClear = () => {
    setUsername("");
    dispatch(clearGithubData());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex flex-col items-center pt-12 pb-32 sm:pt-32 sm:pb-12 px-4 relative overflow-hidden"
    >
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500/20 dark:bg-blue-500/10 blur-[120px] rounded-full pointer-events-none transition-colors duration-500" />

      <div className="text-center space-y-2 mb-12 z-10">
        <h1 className="text-5xl font-bold tracking-tighter bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent pb-2 leading-tight">
          Precision Hub
        </h1>
        <p className="text-slate-600 dark:text-slate-500 text-sm font-medium uppercase tracking-widest">
          Developer Explorer
        </p>
      </div>

      <div className="relative z-10 w-full max-w-xl space-y-6">
        {/* Form Pencarian */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Input GitHub username..."
            className="flex-1 px-6 py-4 rounded-2xl bg-slate-100/60 dark:bg-white/5 border border-slate-300 dark:border-white/10 focus:border-blue-500/50 outline-none transition-all text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 backdrop-blur-md shadow-lg"
          />
          {status === "succeeded" || error ? (
            <button
              type="button"
              onClick={handleClear}
              className="px-6 py-4 rounded-2xl bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-white hover:opacity-90 transition-opacity shadow-lg font-semibold"
            >
              Reset
            </button>
          ) : (
            <button
              type="submit"
              disabled={status === "loading" || !username.trim()}
              className="px-6 py-4 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 dark:from-blue-500 dark:to-cyan-500 text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center min-w-[80px]"
            >
              {status === "loading" ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <Search size={24} />
              )}
            </button>
          )}
        </form>

        {/* Notifikasi Error */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-500 bg-red-500/10 border border-red-500/20 p-4 rounded-2xl text-center backdrop-blur-md"
            >
              {error}
            </motion.div>
          )}

          {/* Profil dan Repositori */}
          {status === "succeeded" && profile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-slate-100/60 dark:bg-white/5 backdrop-blur-3xl border border-slate-300 dark:border-white/10 p-6 sm:p-8 rounded-[2rem] shadow-2xl space-y-8 transition-colors duration-500"
            >
              {/* Profile Section */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <img
                  src={profile.avatar_url}
                  alt={profile.login}
                  className="w-24 h-24 rounded-full border-2 border-blue-500/50 p-1"
                />
                <div className="flex-1 text-center sm:text-left space-y-2">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {profile.name || profile.login}
                    </h2>
                    <a
                      href={profile.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
                    >
                      @{profile.login}
                    </a>
                  </div>
                  {profile.bio && (
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {profile.bio}
                    </p>
                  )}

                  <div className="flex flex-wrap justify-center sm:justify-start gap-4 pt-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <Users size={14} /> {profile.followers} Followers
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen size={14} /> {profile.public_repos} Repos
                    </div>
                    {profile.location && (
                      <div className="flex items-center gap-1">
                        <MapPin size={14} /> {profile.location}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Repositories Section */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 px-1">
                  Latest Repositories
                </h3>
                {repos.length > 0 ? (
                  repos.map((repo) => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="block p-4 rounded-xl border border-slate-300 dark:border-white/5 bg-slate-200/40 dark:bg-white/5 hover:bg-slate-300/50 dark:hover:bg-white/10 transition-colors group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate pr-4">
                          {repo.name}
                        </span>
                        <Link2
                          size={16}
                          className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                        />
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {repo.description || "Tidak ada deskripsi"}
                      </p>
                    </a>
                  ))
                ) : (
                  <p className="text-sm text-slate-500 dark:text-slate-400 px-1">
                    Tidak ada repositori publik.
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
