import { NavLink } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar__logo">S</div>

      <nav className="navbar__links">
        <NavLink to="/">Accueil</NavLink>
        <NavLink to="/Movies">Les Films</NavLink>
        <NavLink to="/Series">Les Séries</NavLink>
      </nav>

      <div className="navbar__burger">☰</div>
    </header>
  );
};

