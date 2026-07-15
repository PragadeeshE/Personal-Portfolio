import { FaGithub } from "react-icons/fa";
import { projects } from "../data/portfolio";

export default function Projects() {
  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="section__header">
          <span className="section__tag">Projects</span>
          <h2 className="section__title">Featured work</h2>
          <p className="section__subtitle">
            Hackathon wins and side projects showcasing full-stack and ML capabilities.
          </p>
        </div>

        <div className="projects__grid">
          {projects.map((project) => (
            <article key={project.title} className="project-card">
              <div className="project-card__header">
                <div>
                  <div className="project-card__title-row">
                    <h3 className="project-card__title">{project.title}</h3>
                    {project.status && (
                      <span className="project-card__badge">{project.status}</span>
                    )}
                  </div>
                  <p className="project-card__subtitle">{project.subtitle}</p>
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card__link"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <FaGithub size={20} aria-hidden="true" />
                  </a>
                )}
              </div>

              <p className="project-card__description">{project.description}</p>

              <div className="project-card__tech">
                {project.tech.map((t) => (
                  <span key={t} className="project-card__tag">
                    {t}
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
