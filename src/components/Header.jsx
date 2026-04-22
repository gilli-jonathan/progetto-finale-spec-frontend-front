import Navbar from "./Navbar"
import Searchbar from "./SearchBar"
import imgLogo from "../../public/logo-masterRom.png"

export default function Header() {

    return (
        <header className="header-main">
            <div className="header-container">

                <div className="logo-wrapper">
                    <img src={imgLogo} alt="MasterRom" className="logo-img" />
                </div>

                <Navbar />

                <div className="search-wrapper">
                    <Searchbar />
                </div>

            </div>
        </header>
    )
}