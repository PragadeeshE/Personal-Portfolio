import { FiMail, FiPhone } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { personal } from "../data/portfolio";

const contactLinks = [
  {
    label: "Email",
    value: personal.email,
    href: `mailto:${personal.email}`,
    icon: FiMail,
  },
  {
    label: "Phone",
    value: personal.phone,
    href: `tel:${personal.phone.replace(/-/g, "")}`,
    icon: FiPhone,
  },
  {
    label: "LinkedIn",
    value: "Connect on LinkedIn",
    href: personal.linkedin,
    icon: FaLinkedin,
  },
  {
    label: "GitHub",
    value: "View repositories",
    href: personal.github,
    icon: FaGithub,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="contact__wrapper">
          <div className="contact__info">
            <span className="section__tag">Contact</span>
            <h2 className="section__title">Let's work together</h2>
            <p className="contact__text">
              Open to full-time roles, freelance projects, and collaborations.
              Reach out — I'd love to hear from you.
            </p>
            <p className="contact__location">{personal.location}</p>
          </div>

          <div className="contact__links">
            {contactLinks.map((link) => {
              const Icon = link.icon;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="contact__card"
                >
                  <span className="contact__icon">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span className="contact__label">{link.label}</span>
                  <span className="contact__value">{link.value}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
