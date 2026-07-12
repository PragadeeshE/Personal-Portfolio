import { personal } from "../data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>
         Completely built with React.
        </p>
        <p className="footer__location">{personal.location}</p>
      </div>
    </footer>
  );
}
