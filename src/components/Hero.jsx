import { personal } from "../data/portfolio";

export default function Hero() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="hero">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__grid" />
      </div>

      <div className="container hero__content">
        <p className="hero__eyebrow">
          <span className="hero__status" />
          Available for opportunities
        </p>

        <h1 className="hero__title">
          Hi, I'm <span className="hero__highlight">{personal.name.split(" ")[0]}</span>
          <br />
          <span className="hero__subtitle">{personal.title}</span>
        </h1>

        <p className="hero__description">{personal.summary}</p>

        <div className="hero__meta">
          <span>{personal.location}</span>
          <span className="hero__dot" />
          <span>Enterprise · Full-Stack · AI</span>
        </div>

        <div className="hero__actions">
          <button className="btn btn--primary" onClick={() => scrollTo("projects")}>
            View Projects
          </button>
          <button className="btn btn--outline" onClick={() => scrollTo("contact")}>
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  );
}
