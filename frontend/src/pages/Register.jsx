import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, User, Loader2 } from "lucide-react";
import AuthLayout, { Field } from "../components/AuthLayout";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const [form, setForm] = useState({ username: "", password: "", confirm: "" });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    if (form.password !== form.confirm) return setErr("Passwords do not match");
    setBusy(true);
    try {
      await register({ username: form.username, password: form.password });
    } catch (e) {
      setErr(e.response?.data?.message || e.response?.data?.error || "Registration failed");
      setBusy(false);
    }
  };

  return (
    <AuthLayout title="Create account" subtitle="Join InstagramLite. AI writes your captions.">
      <form onSubmit={submit} className="space-y-3">
        <Field icon={User} placeholder="Username" value={form.username} onChange={set("username")} />
        <Field icon={Lock} type="password" placeholder="Password" value={form.password} onChange={set("password")} />
        <Field icon={Lock} type="password" placeholder="Confirm password" value={form.confirm} onChange={set("confirm")} />

        <AnimatePresence>
          {err && (
            <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-xl bg-red-500/10 px-3 py-2 text-xs text-red-300">
              {err}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-orange-500 py-3 font-semibold shadow-lg shadow-fuchsia-600/30 disabled:opacity-60">
          {busy && <Loader2 size={18} className="animate-spin" />}
          Create account
        </motion.button>
      </form>

      <p className="mt-6 text-center text-sm text-white/50">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-fuchsia-400 hover:underline">Login</Link>
      </p>
    </AuthLayout>
  );
}