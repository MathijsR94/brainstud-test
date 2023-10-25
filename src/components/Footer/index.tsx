import Tagline from "../../assets/tagline.svg?react";
import "./footer.scss";

/**
 * Display header
 */
export function Footer() {
  return (
    <footer className="footer">
      <section className="tagline">
        <Tagline />
      </section>
    </footer>
  );
}
