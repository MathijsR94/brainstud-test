import Logo from "../../assets/logo.svg?react";
import "./header.scss";

/**
 * Display header
 */
export function Header() {
  return (
    <header className="header">
      <section className="logo">
        <Logo />
      </section>
    </header>
  );
}
