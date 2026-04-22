import { useContext, useState } from "react";
import { GameContext } from "../context/GlobalContext";

export default function FiltersForm() {

    const { filters, setFilters } = useContext(GameContext) //filters contiene category, console, platform


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
                onClick={() => setFilters(resetObj)}
            >
                RESET FILTRI
            </button>
        </div>
    )

} 