import { NavLink } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <nav>
      <header className="header">
        <div className="header__bar">
          <nav className="nav">
            <ul className="nav__list">
            <NavLink to="/">Accueil</NavLink>
        <NavLink to="/Movies">Les Films</NavLink>
        <NavLink to="/Series">Les Séries</NavLink>
            </ul>
          </nav>

          <div className="burger">☰</div>
        </div>
      </header>
      )}
  );
};
