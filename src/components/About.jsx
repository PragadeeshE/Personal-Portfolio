import { personal } from "../data/portfolio";

const strengths = [
  "Scalable REST APIs & distributed systems",
  "Production debugging & incident resolution",
  "Cross-functional Agile delivery",
  "Automated testing & quality assurance",
  "AI/ML integration & RAG pipelines",
];

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="section__header">
          <span className="section__tag">About</span>
          <h2 className="section__title">Building reliable software at scale</h2>
        </div>

        <div className="about__grid">
          <div className="about__text">
            <p>{personal.summary}</p>
            <p>
              Currently at <strong>Udemy</strong>, I work on enterprise B2B learning platforms,
              payment integrations, and international market features. I bring a strong foundation
              in software engineering principles, system design, and cross-functional collaboration
              to every project I ship.
            </p>
          </div>

          <div className="about__strengths">
            <h3>Core Strengths</h3>
            <ul>
              {strengths.map((item) => (
                <li key={item}>
                  <span className="about__check" aria-hidden="true">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
