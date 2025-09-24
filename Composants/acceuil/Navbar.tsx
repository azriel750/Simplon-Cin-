import { NavLink } from "react-router-dom";
import "./Navbar.css"

export const Navbar = () => {
    return (
        <nav>
        <div className="Header">
            <div className="Liens">
                <NavLink to="/">Acceuil</NavLink>
                <NavLink to="/Movies">Les Films</NavLink>
                <NavLink to="/Series">Les Séries</NavLink>
                </div>
            </div>
        </nav>
    );

};