import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Camera } from "lucide-react";

export function Field({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
      <input
        {...props}
        required
        className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-sm outline-none transition placeholder:text-white/30 focus:border-fuchsia-500/60 focus:bg-white/10"
      />
    </div>
  );
}

export default function AuthLayout({ title, subtitle, children }) {
  const bg = useRef(null);

  // GSAP: floating gradient blobs
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".blob", {
        x: "random(-120,120)",
        y: "random(-100,100)",
        scale: "random(0.8,1.3)",
        duration: 6,
        ease: "sine.inOut",
        repeat: -1,
        repeatRefresh: true,
        yoyo: true,
        stagger: 0.8,
      });
    }, bg);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={bg} className="relative grid min-h-screen place-items-center overflow-hidden px-4">
      <div className="blob absolute -left-20 top-10 h-80 w-80 rounded-full bg-fuchsia-600/40 blur-3xl" />
      <div className="blob absolute right-0 top-1/3 h-96 w-96 rounded-full bg-indigo-600/40 blur-3xl" />
      <div className="blob absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-orange-500/30 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 16 }}
        className="glass relative w-full max-w-md rounded-3xl p-8 shadow-2xl"
      >
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-orange-400 shadow-lg shadow-fuchsia-500/30">
            <Camera />
          </div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="mt-1 text-sm text-white/50">{subtitle}</p>
        </div>
        {children}
      </motion.div>
    </div>
  );
}