import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { profile, tech, stats, skills, experience, projects } from "../data";

export const Reveal = ({ children, delay = 0, className }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.55, delay }}
  >
    {children}
  </motion.div>
);
const Label = ({ t }) => <p className="label">/{t}</p>;

function useTyping(words) {
  const [i, setI] = useState(0),
    [txt, setTxt] = useState(""),
    [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[i % words.length];
    const t = setTimeout(
      () => {
        if (!del) {
          setTxt(w.slice(0, txt.length + 1));
          if (txt.length + 1 === w.length) setTimeout(() => setDel(true), 1100);
        } else {
          setTxt(w.slice(0, txt.length - 1));
          if (txt.length <= 1) {
            setDel(false);
            setI(i + 1);
          }
        }
      },
      del ? 40 : 80,
    );
    return () => clearTimeout(t);
  }, [txt, del, i, words]);
  return txt;
}

export function Hero() {
  const typed = useTyping(profile.words);
  return (
    <section className="hero wrap">
      <motion.p
        className="code"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <span className="k">const</span> developer ={" "}
        <span className="s">"{profile.name}"</span>
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        I <span className="grad">{typed}</span>
        <span className="caret">|</span>
      </motion.h1>
      <motion.p
        className="lead"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
      >
        {profile.tagline}
      </motion.p>
      <motion.div
        className="btns"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <a className="btn primary" href="#projects">
          View Work
        </a>
        <a className="btn" href="/BHARAT_REACT_RESUME.pdf" download="Bharat_Resume_FullStackDeveloper.pdf">
          Resume
        </a>
      </motion.div>
      <div className="marquee">
        <div className="track">
          {[...tech, ...tech].map((t, i) => (
            <span className="chip" key={i}>
              {t}
            </span>
          ))}
        </div>
      </div>
      <blockquote className="quote">
        “{profile.quote}” <cite>— {profile.name.toUpperCase()}</cite>
      </blockquote>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="wrap sec">
      <Reveal>
        <Label t="about" />
        <h2>Building Web Products End to End, From Requirement to Release</h2>
      </Reveal>
      <div className="about-grid">
        <Reveal className="avatar">
          <div>B</div>
        </Reveal>
        <Reveal delay={0.1}>
          {profile.intro.map((p, i) => (
            <p key={i} className="muted">
              {p}
            </p>
          ))}
          <div className="tags">
            {tech.slice(0, 5).map((t) => (
              <span className="tag" key={t}>
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
      <div className="stats">
        {stats.map(([n, l], i) => (
          <Reveal key={l} delay={i * 0.08} className="stat">
            <b>{n}</b>
            <span>{l}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="wrap sec">
      <Reveal>
        <Label t="skills" />
        <h2>Technologies I work with</h2>
        <p className="muted">Grouped by where they fit.</p>
      </Reveal>
      <div className="cards">
        {Object.entries(skills).map(([g, list], i) => (
          <Reveal key={g} delay={i * 0.06} className="card">
            <h3>{g}</h3>
            <div className="tags">
              {list.map((s) => (
                <span className="tag" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="wrap sec">
      <Reveal>
        <Label t="experience" />
        <h2>Where I've shipped</h2>
      </Reveal>
      {experience.map((e) => (
        <Reveal key={e.company} className="card job">
          <div className="job-head">
            <div>
              <h3>{e.company}</h3>
              <p className="muted">{e.role}</p>
            </div>
            <p className="muted mono">
              {e.period} · {e.place}
            </p>
          </div>
          <ul>
            {e.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <div className="tags">
            {e.tags.map((t) => (
              <span className="tag" key={t}>
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      ))}
    </section>
  );
}

export function Projects() {
  return (
    <section id="projects" className="wrap sec">
      <Reveal>
        <Label t="projects" />
        <h2>Featured projects</h2>
      </Reveal>
      <div className="cards">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08}>
            <motion.div whileHover={{ y: -6 }} className="card">
              <div className="thumb">{p.title}</div>
              <h3>{p.title}</h3>
              <p className="muted">{p.desc}</p>
              <div className="tags">
                {p.stack.map((s) => (
                  <span className="tag" key={s}>
                    {s}
                  </span>
                ))}
              </div>
              <Link className="more" to={p.links[0]}>
                View Live Demo →
              </Link>
              <Link className="more" to={p.links[1]}>
                View Source Code →
              </Link>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  const [f, setF] = useState({ name: "", email: "", message: "" });
  const on = (e) => setF({ ...f, [e.target.name]: e.target.value });
  const send = (e) => {
    e.preventDefault();
    const body = encodeURIComponent(`${f.message}\n\n— ${f.name} (${f.email})`);
    window.location.href = `mailto:${profile.email}?subject=Portfolio%20enquiry&body=${body}`;
  };
  return (
    <section id="contact" className="wrap sec">
      <Reveal>
        <Label t="contact" />
        <h2>Let's build something together</h2>
        <p className="muted">
          Open to full-stack and frontend roles, freelance work, or just a good
          conversation.
        </p>
      </Reveal>
      <div className="contact-grid">
        <Reveal>
          <form onSubmit={send}>
            <input
              name="name"
              placeholder="Name"
              value={f.name}
              onChange={on}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={f.email}
              onChange={on}
              required
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Message"
              value={f.message}
              onChange={on}
              required
            />
            <button className="btn primary" type="submit">
              Send message →
            </button>
          </form>
        </Reveal>
        <Reveal delay={0.1} className="direct">
          <p className="muted">Or reach me directly</p>
          <a className="card" href={`mailto:${profile.email}`}>
            Email <span>{profile.email} ↗</span>
          </a>
          <a
            className="card"
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn <span>Profile ↗</span>
          </a>
          <a
            className="card"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub <span>Profile ↗</span>
          </a>
        </Reveal>
      </div>
      <p className="foot muted">
        © {new Date().getFullYear()} {profile.name}. Built with React, Vite &
        Framer Motion.
      </p>
    </section>
  );
}
