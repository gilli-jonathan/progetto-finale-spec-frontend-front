import { createContext, useState, useEffect, useCallback, useMemo } from "react";
import { useFetchGames } from "../hooks/useFetchGames.js";

const GameContext = createContext()
const FavoriteContext = createContext()
const CompareContext = createContext()

function GameProvider({ children }) {

    const games = useFetchGames()

    //la stringa che verrà usata come ricerca tremite la searchBar
    const [searchQuery, setSearchQuery] = useState("")
    const [inputValue, setInputValue] = useState('')

    // metto i filtri per la ricerca come categoria, console, ecc..
    const [filters, setFilters] = useState({
        "category": "",
        "console": "",
        "platform": "",
        "order": "dritto"
    })

    return (
        <GameContext.Provider value={{ games, searchQuery, setSearchQuery, filters, setFilters, inputValue, setInputValue }}>
            {children}
        </GameContext.Provider>
    )
}

function FavoriteProvider({ children }) {

    const [favGames, setFavGames] = useState(() => {
        const savedFavs = localStorage.getItem("zelda_favorites");
        return savedFavs ? JSON.parse(savedFavs) : []; // se esiste lo convertiamo, altrimenti array vuoto
    });

    // ogni volta che favGames cambia, salviamo nel localStorage
    useEffect(() => {
        localStorage.setItem("zelda_favorites", JSON.stringify(favGames));
    }, [favGames]);

    const toggleFav = useCallback((game) => {

        setFavGames(prev => {
            //const che restituisce true o false, questo gioco è già tra i miei preferiti?
            const nellaLista = prev.find(g => g.id === game.id)
            //ora in base alla risposta agisco in 2 modi
            if (nellaLista) { //TRUE tolgo il gioco dalla lista con un filter
                return prev.filter(g => g.id !== game.id)
            } else { //FALSE faccio un clone dell'array(oppure lo creo) e aggiungo quello nuovo 
                const nuovoElenco = [...prev, game]
                return nuovoElenco //sto assegnando a favGame questi oggetti
            }
        })
    }, [])

    //impacchetto tutti i valori con useMemo prima di passarli al Provider
    const value = useMemo(() => {
        return {
            favGames,
            toggleFav
        };
    }, [favGames, toggleFav]);

    return (
        <FavoriteContext.Provider value={value}>
            {children}
        </FavoriteContext.Provider>
    )
}

function CompareProvider({ children }) {

    const [compGames, setCompGames] = useState([])

    const toggleComp = useCallback((game) => {
        //avvolgo tutto dentro useCallback così da non annullare il react.memo

        setCompGames(prev => {
            //const che restituisce true o false, questo gioco è già in questa lista?
            const giaPresente = prev.find(g => g.id === game.id)

            //ora in base alla risposta agisco in 2 modi
            if (giaPresente) { //TRUE tolgo il gioco dalla lista con un filter
                return prev.filter(g => g.id !== game.id)
            } else { //FALSE gestisco cosa fare se il gioco non è nella lista:
                if (prev.length >= 2) {
                    //ho già 2 giochi Comp pieno
                    alert("hai già 2 giochi da confrontare")
                    return prev //rimetto tutto com'era prima

                } else { //ho spazio e aggiungo il gioco
                    const nuovoElenco = [...prev, game]
                    return nuovoElenco //divido per ordine mentale
                }
            }
        })

    }, [])

    //impacchetto tutti i valori con useMemo prima di passarli al Provider
    const value = useMemo(() => {
        return {
            compGames,
            toggleComp
        };
    }, [compGames, toggleComp]);
    return (
        <CompareContext.Provider value={value}>
            {children}
        </CompareContext.Provider>
    )
}

export {
    GameContext, GameProvider,
    FavoriteContext, FavoriteProvider,
    CompareContext, CompareProvider
}