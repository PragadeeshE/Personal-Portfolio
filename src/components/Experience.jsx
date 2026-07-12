import { experience } from "../data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="container">
        <div className="section__header">
          <span className="section__tag">Experience</span>
          <h2 className="section__title">Professional journey</h2>
        </div>

        <div className="timeline">
          {experience.map((job, index) => (
            <article key={`${job.company}-${job.period}`} className="timeline__item">
              <div className="timeline__marker" aria-hidden="true">
                <span className="timeline__dot" />
                {index < experience.length - 1 && <span className="timeline__line" />}
              </div>

              <div className="timeline__card">
                <div className="timeline__header">
                  <div>
                    <h3 className="timeline__role">{job.role}</h3>
                    <p className="timeline__company">
                      {job.company} · {job.location}
                    </p>
                  </div>
                  <span className="timeline__period">{job.period}</span>
                </div>

                <ul className="timeline__highlights">
                  {job.highlights.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
