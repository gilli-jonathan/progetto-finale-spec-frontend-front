import Navbar from "./Navbar"
import Searchbar from "./SearchBar"
import imgLogo from "../../public/logo-masterRom.png"

export default function Header() {

    return (
        <header className="header-main">
            <div className="header-container">

                {/* LOGO: Ora più grande e pulito */}
                <div className="logo-wrapper">
                    <img src={imgLogo} alt="MasterRom" className="logo-img" />
                </div>

                {/* NAVBAR: Al centro */}
                <Navbar />

                {/* SEARCH: A destra */}
                <div className="search-wrapper">
                    <Searchbar />
                </div>

            </div>
        </header>
    )
}