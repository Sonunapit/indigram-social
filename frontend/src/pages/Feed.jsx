import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, LogOut, Camera, ImageOff } from "lucide-react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";
import PostCard from "../components/PostCard";
import UploadModal from "../components/UploadModal";

export default function Feed() {
  const { user, logout } = useAuth();
  const [posts, setPosts] = useState(null);
  const [open, setOpen] = useState(false);

  
  useEffect(() => {
  api.get("/api/posts")
    .then((r) => setPosts(r.data.posts))
    .catch((e) => {
      console.error("FEED ERROR >>>", e.response?.status, e.response?.data);
      setPosts([]);
    });
}, []);

  return (
    <div className="min-h-screen pb-24">
      <header className="glass sticky top-0 z-30">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2 text-xl font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-orange-400">
              <Camera size={18} />
            </span>
            Instagram<span className="text-fuchsia-400">Lite</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-white/60 sm:block">@{user?.username || "you"}</span>
            <button onClick={logout} title="Logout" className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        {posts === null ? (
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {[260, 340, 300, 380, 280, 320].map((h, i) => (
              <div key={i} style={{ height: h }} className="glass mb-5 animate-pulse break-inside-avoid rounded-3xl" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid place-items-center py-32 text-center text-white/50">
            <ImageOff size={48} className="mb-4" />
            <p className="text-lg font-medium text-white/80">No posts yet</p>
            <p className="text-sm">Tap the + button to share your first photo.</p>
          </motion.div>
        ) : (
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {posts.map((p, i) => (
              <PostCard key={p._id} post={p} index={i} />
            ))}
          </div>
        )}
      </main>

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-30 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-fuchsia-600 to-orange-500 shadow-xl shadow-fuchsia-600/40"
      >
        <Plus />
      </motion.button>

      <AnimatePresence>
        {open && (
          <UploadModal
            onClose={() => setOpen(false)}
            onCreated={(p) => setPosts((prev) => [p, ...(prev || [])])}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
