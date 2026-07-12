import { useState, useEffect } from "react";
import { navLinks, personal } from "../data/portfolio";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const initials = personal.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner container">
        <button
          className="navbar__brand"
          onClick={() => handleNavClick("hero")}
          aria-label="Go to top"
        >
          <span className="navbar__logo">{initials}</span>
          <span className="navbar__name">{personal.name.split(" ")[0]}</span>
        </button>

        <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
          {navLinks.map((link) => (
            <li key={link.id}>
              <button onClick={() => handleNavClick(link.id)}>{link.label}</button>
            </li>
          ))}
        </ul>

        <button
          className="navbar__toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
