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

    function handleSubmit() {
        e.preventDefault();
        console.log("Filtri applicati:", filters);
    }

    return (

        <form onSubmit={handleSubmit}>
            <label><p>categotia</p>
                <select name="category" value={filters.category} onChange={handleFilterChange}>
                    <option value="">scegli</option>
                    <option value="Classic">Classic</option>
                    <option value="Side-scrolling">Side-Scrolling</option>
                    <option value="Action 3D">Action 3D</option>
                    <option value="Open Air">Open air</option>
                </select>
            </label>

            <button type="submit"> cerca </button>
        </form>
    )

} 