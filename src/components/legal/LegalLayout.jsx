import { Link } from "react-router-dom";

export default function LegalLayout({ title, children }) {
  return (
    <main className="legal-page">
      <div className="legal-shell">
        <header className="legal-header">
          <Link to="/" className="legal-logo-link" aria-label="Steelhead home">
            <img
              src="/steelhead-logo.svg"
              alt="Steelhead"
              className="legal-logo"
            />
          </Link>

          <h1>{title}</h1>
        </header>

        <article className="legal-document">{children}</article>

        <nav className="legal-nav" aria-label="Legal navigation">
          <Link to="/">Home</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Use</Link>
        </nav>
      </div>
    </main>
  );
}
