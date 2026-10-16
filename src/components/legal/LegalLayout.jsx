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

        <footer className="legal-footer">
          <nav className="legal-nav" aria-label="Legal navigation">
            <Link to="/">Home</Link>
            <span className="legal-nav-separator">•</span>
            <Link to="/privacy">Privacy Policy</Link>
            <span className="legal-nav-separator">•</span>
            <Link to="/terms">Terms of Use</Link>
          </nav>

          <div className="legal-footer-info">
            <p>
              Questions:{" "}
              <a href="mailto:support@steelhead.ai" className="legal-support-link">
                support@steelhead.ai
              </a>
            </p>
            <p className="legal-copyright">
              © {new Date().getFullYear()} Steelhead AI. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
