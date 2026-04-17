import { NavLink } from "react-router-dom";

export default function Navbar() {

    return (
        <nav>
            <NavLink to="/">  HOME  </NavLink>

            <NavLink to="/game/:12">  DETAIL  </NavLink>

            <NavLink to="/compare">  COMPARE  </NavLink>

            <NavLink to="/favorite">  FAVORITI  </NavLink>
        </nav>
    )
}