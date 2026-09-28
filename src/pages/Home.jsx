import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Hero,
  About,
  Skills,
  Experience,
  Projects,
  Contact,
} from "../components/Sections";

const Home = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return undefined;
    }
    const id = setTimeout(
      () =>
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }),
      50,
    );
    return () => clearTimeout(id);
  }, [hash]);

  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </main>
  );
};

export default Home;