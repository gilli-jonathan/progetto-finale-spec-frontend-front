import { NavLink } from "react-router-dom";

export default function Navbar() {

    return (
        <nav className="nav-hd">
            <NavLink className="nav-link" to="/">HOME</NavLink>
            <NavLink className="nav-link" to="/game/19">DETAIL</NavLink>
            <NavLink className="nav-link" to="/compare">COMPARE</NavLink>
            <NavLink className="nav-link" to="/favorite">FAVORITI</NavLink>
        </nav>
    )
}