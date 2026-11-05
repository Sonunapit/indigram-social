import { useState } from "react";
import { motion } from "framer-motion";
import { X, UploadCloud, Loader2, Sparkles } from "lucide-react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";

export default function UploadModal({ onClose, onCreated }) {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const [err, setErr] = useState("");

  const pick = (f) => {
    if (!f) return;
    if (!f.type.startsWith("image/")) return setErr("Please choose an image");
    if (f.size > 5 * 1024 * 1024) return setErr("Max size is 5MB");
    setErr("");
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const submit = async () => {
    setBusy(true);
    setErr("");
    try {
      const fd = new FormData();
      fd.append("image", file);
      const { data } = await api.post("/api/posts", fd, {
        onUploadProgress: (e) => setProgress(Math.round((e.loaded * 100) / (e.total || 1))),
      });
      onCreated({ ...data.post, user: { username: user?.username } });
      onClose();
    } catch (e) {
      setErr(e.response?.data?.error || "Upload failed");
      setBusy(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => !busy && onClose()}
      className="fixed inset-0 z-40 grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 140, damping: 18 }}
        onClick={(e) => e.stopPropagation()}
        className="glass w-full max-w-md rounded-3xl bg-[#14141f] p-6"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">New post</h2>
          <button disabled={busy} onClick={onClose} className="rounded-full p-1 hover:bg-white/10"><X size={20} /></button>
        </div>

        {preview ? (
          <img src={preview} alt="preview" className="max-h-80 w-full rounded-2xl object-cover" />
        ) : (
          <label
            onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => { e.preventDefault(); setDrag(false); pick(e.dataTransfer.files[0]); }}
            className={`grid cursor-pointer place-items-center rounded-2xl border-2 border-dashed py-14 text-center transition ${drag ? "border-fuchsia-500 bg-fuchsia-500/10" : "border-white/15 hover:border-white/30"}`}
          >
            <UploadCloud size={36} className="mb-2 text-fuchsia-400" />
            <p className="text-sm text-white/70">Drag & drop or click to choose</p>
            <p className="text-xs text-white/40">JPG, PNG, WEBP · max 5MB</p>
            <input type="file" accept="image/*" hidden onChange={(e) => pick(e.target.files[0])} />
          </label>
        )}

        {err && <p className="mt-3 rounded-xl bg-red-500/10 px-3 py-2 text-xs text-red-300">{err}</p>}

        {busy && (
          <div className="mt-4">
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div className="h-full bg-gradient-to-r from-fuchsia-500 to-orange-400" animate={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 flex items-center gap-2 text-xs text-white/60">
              <Sparkles size={14} className="text-fuchsia-400" />
              {progress < 100 ? "Uploading..." : "AI is writing your caption..."}
            </p>
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          disabled={!file || busy}
          onClick={submit}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-orange-500 py-3 font-semibold disabled:opacity-40"
        >
          {busy ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
          {busy ? "Posting..." : "Post with AI caption"}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
