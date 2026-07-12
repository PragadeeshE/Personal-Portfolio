import { education } from "../data/portfolio";

export default function Education() {
  return (
    <section id="education" className="section education">
      <div className="container">
        <div className="section__header">
          <span className="section__tag">Education</span>
          <h2 className="section__title">Academic background</h2>
        </div>

        <div className="education__grid">
          {education.map((item) => (
            <article key={item.degree} className="education__card">
              <span className="education__period">{item.period}</span>
              <h3 className="education__degree">{item.degree}</h3>
              <p className="education__school">{item.school}</p>
              <p className="education__detail">{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
