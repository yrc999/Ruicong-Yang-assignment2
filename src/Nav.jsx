import { NavLink, Outlet } from "react-router-dom";
import "./Nav.css";

export default function Nav() {
    return (
        <nav>
            <NavLink to="/" exact activeClassName="active">
                Home
            </NavLink>
            <NavLink to="/app" activeClassName="active">
                Game
            </NavLink>
            <NavLink to="/credit" activeClassName="active">
                Credit
            </NavLink>
        </nav>
    );
}