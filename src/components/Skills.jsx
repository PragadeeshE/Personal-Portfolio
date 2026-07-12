import { skills } from "../data/portfolio";

export default function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <div className="section__header">
          <span className="section__tag">Skills</span>
          <h2 className="section__title">Technical expertise</h2>
          <p className="section__subtitle">
            Full-stack development across backend systems, modern frontends, and emerging AI technologies.
          </p>
        </div>

        <div className="skills__grid">
          {skills.map((group) => (
            <article key={group.category} className="skills__card">
              <h3 className="skills__category">{group.category}</h3>
              <div className="skills__tags">
                {group.items.map((skill) => (
                  <span key={skill} className="skills__tag">
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
