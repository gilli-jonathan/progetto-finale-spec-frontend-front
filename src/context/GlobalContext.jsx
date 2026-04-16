import { createContext } from "react";

const GameContext = createContext()
const FavoriteContext = createContext()
const CompareContext = createContext()

function GameProvider({ children }) {

    const games = 'inserire il risultato dell api'

    return (
        <GameContext.Provider value={games}>
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