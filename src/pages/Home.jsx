import "../styles/home.css";
import Logo from "../components/ui/Logo";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <>
      <main className="container">
        <Logo />

        <div className="content">
          <h1>Closed Beta</h1>
          <p className="subtitle">
            Summer <span className="accent">2026</span>
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
