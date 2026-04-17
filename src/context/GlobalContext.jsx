import { createContext, useState } from "react";
import { useFetchGames } from "../hooks/useFetchGames.js";
// import { useGameDetails } from "../hooks/";

const GameContext = createContext()
const FavoriteContext = createContext()
const CompareContext = createContext()

function GameProvider({ children }) {

    const games = useFetchGames()

    //la stringa che verrà usata come ricerca tremite la searchBar
    const [searchQuery, setSearchQuery] = useState("")

    // metto i filtri per la ricerca come categoria, console, ecc..
    const [filters, setFilters] = useState({
        "category": "",
        "console": "",
        "platform": "",
        "order": "dritto"
    })

    return (
        <GameContext.Provider value={{ games, searchQuery, setSearchQuery, filters, setFilters }}>
            {children}
        </GameContext.Provider>
    )
}

function FavoriteProvider({ children }) {

    const favGames = 'mettere uno state per gestire i preferiti'

    return (
        <FavoriteContext.Provider value={favGames}>
            {children}
        </FavoriteContext.Provider>
    )
}

function CompareProvider({ children }) {

    const compareGame = 'usare uno state per gestire il confronto'

    return (
        <CompareContext.Provider value={compareGame}>
            {children}
        </CompareContext.Provider>
    )
}

export {
    GameContext, GameProvider,
    FavoriteContext, FavoriteProvider,
    CompareContext, CompareProvider
}