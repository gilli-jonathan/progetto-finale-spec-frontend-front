import { createContext, useState } from "react";
import { useFetchGames } from "../hooks/useFetchGames.js";

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

    const [favGames, setFavGames] = useState([])

    const toggleFav = game => {
        setFavGames(prev => {
            //const che restituisce true o false, questo gioco è già tra i miei preferiti?
            const nellaLista = prev.find(g => g.id === game.id)
            //ora in base alla risposta agisco in 2 modi
            if (nellaLista) { //TRUE tolgo il gioco dalla lista con un filter
                return prev.filter(g => g.id !== game.id)
            } else { //FALSE faccio un clone dell'array(oppure lo creo) e aggiungo quello nuovo 
                const nuovoElenco = [...prev, game]
                return nuovoElenco //sto assegnanfo a favGame questi oggetti
            }
        })
    }

    return (
        <FavoriteContext.Provider value={{ favGames, toggleFav }}>
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