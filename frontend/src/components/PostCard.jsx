import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const renderCaption = (text = "") =>
  text.split(/(#\w+)/g).map((part, i) =>
    part.startsWith("#") ? (
      <span key={i} className="text-fuchsia-400">{part}</span>
    ) : (
      part
    )
  );

export default function PostCard({ post, index }) {
  const [liked, setLiked] = useState(false);
  const [more, setMore] = useState(false);
  const name = post.user?.username || "user";

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index, 8) * 0.06, type: "spring", stiffness: 120, damping: 18 }}
      whileHover={{ y: -4 }}
      className="glass mb-5 break-inside-avoid overflow-hidden rounded-3xl"
    >
      <div className="flex items-center gap-3 p-4">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500 to-orange-400 text-sm font-bold uppercase">
          {name[0]}
        </div>
        <span className="text-sm font-semibold">@{name}</span>
      </div>

      <div className="overflow-hidden" onDoubleClick={() => setLiked(true)}>
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
          src={post.image}
          alt={post.caption?.slice(0, 40) || "post"}
          loading="lazy"
          className="w-full object-cover"
        />
      </div>

      <div className="p-4">
        <motion.button whileTap={{ scale: 0.7 }} onClick={() => setLiked(!liked)}>
          <Heart size={24} className={liked ? "fill-red-500 text-red-500" : "text-white/80"} />
        </motion.button>

        {post.caption && (
          <p className={`mt-3 whitespace-pre-line text-sm leading-relaxed text-white/80 ${more ? "" : "line-clamp-4"}`}>
            {renderCaption(post.caption)}
          </p>
        )}
        {post.caption?.length > 160 && (
          <button onClick={() => setMore(!more)} className="mt-1 text-xs text-white/40 hover:text-white">
            {more ? "less" : "more"}
          </button>
        )}
      </div>
    </motion.article>
  );
}
