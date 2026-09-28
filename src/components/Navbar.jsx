import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
const links = ["about", "skills", "experience", "projects", "contact"];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  return (
    <motion.header
      className="nav"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="wrap nav-in">
        <Link to="/" className="logo" onClick={() => setOpen(false)}>
          &lt;B /&gt;
        </Link>
        <nav className={open ? "links open" : "links"}>
          {links.map((l) => (
            <Link
              key={l}
              to={{ pathname: "/", hash: "#" + l }}
              onClick={() => setOpen(false)}
            >
              /{l}
            </Link>
          ))}
          <button
            className="icon-btn"
            onClick={toggle}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>
        </nav>
        <button
          className="burger"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
    </motion.header>
  );
}
