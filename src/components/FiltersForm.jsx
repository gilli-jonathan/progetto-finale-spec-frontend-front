import { useContext, useState } from "react";
import { GameContext } from "../context/GlobalContext";
import Searchbar from "./SearchBar";

export default function FiltersForm() {

    const { filters, setFilters, setSearchQuery, setInputValue } = useContext(GameContext)

    // Funzione per gestire il cambiamento della select
    const handleFilterChange = (e) => {
        const { name, value } = e.target;

        // Aggiorniamo lo stato globale mantenendo gli altri filtri per(se) quando saranno aggiunti
        setFilters({
            ...filters,
            [name]: value
        })
    }

    const resetObj = {
        "category": "",
        "console": "",
        "platform": "",
        "order": "dritto"
    }


    return (

        <div className="filters-sidebar retro-outset">
            <h4 className="brutal-border-bottom">FILTRI</h4>
            <Searchbar />
            <div className="filter-group">
                <label>Categoria</label>
                <select
                    name="category"
                    className="retro-inset"
                    value={filters.category}
                    onChange={handleFilterChange}
                >
                    <option value="">Tutte le categorie</option>
                    <option value="Classic">Classic</option>
                    <option value="Side-scrolling">Side-Scrolling</option>
                    <option value="Action 3D">Action 3D</option>
                    <option value="Open Air">Open air</option>
                </select>
            </div>

            {/* <div className="filter-group">
                <label>Console</label>
                <select
                    name="console"
                    className="retro-inset"
                    value={filters.console}
                    onChange={handleFilterChange}
                >
                    <option value="">Tutte le categorie</option>
                    <option value="NES">Famicom</option>
                    <option value="SNES">Super Nintendo</option>
                    <option value="GameBoy">GameBoy</option>
                    <option value="Nintendo 64">Nintendo 64</option>
                    <option value="GameCube">GameCube</option>
                    <option value="Nintendo DS">Nintendo DS</option>
                    <option value="Wii">Wii</option>
                    <option value="Nintendo 3DS">Nintendo 3DS</option>
                    <option value="Switch">Switch</option>

                </select>
            </div> */}

            <div className="filter-group">
                <label>Ordina Alfabetico</label>
                <select
                    name="order"
                    className="retro-inset"
                    value={filters.order}
                    onChange={handleFilterChange}
                >
                    <option value="dritto">A - Z</option>
                    <option value="reverse">Z - A</option>
                </select>
            </div>

            <button
                type="button"
                className="reset-btn retro-outset"
                onClick={() => {
                    setFilters(resetObj);// Reset dei filtri (categoria, ordine, ecc.)
                    setSearchQuery('');// Reset della barra di ricerca
                    setInputValue('');
                }}
            >
                RESET FILTRI
            </button>
        </div>
    )

} 