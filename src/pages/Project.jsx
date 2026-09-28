import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "../data";
export default function Project() {
  const p = projects.find((x) => x.id === useParams().id);
  if (!p)
    return (
      <main className="wrap page">
        <h1>Project not found</h1>
        <Link to="/">← Back</Link>
      </main>
    );
  return (
    <motion.main
      className="wrap page"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Link className="more" to={{ pathname: "/", hash: "#projects" }}>
        ← Back to projects
      </Link>
      <h1>{p.title}</h1>
      <p className="muted">{p.desc}</p>
      <div className="tags">
        {p.stack.map((s) => (
          <span className="tag" key={s}>
            {s}
          </span>
        ))}
      </div>
      <div className="thumb big">{p.title}</div>
      <p>{p.body}</p>
    </motion.main>
  );
}
