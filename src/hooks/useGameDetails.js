import { useState, useEffect } from "react"
const { VITE_API_URL } = import.meta.env;


function useGameDetails(gameId) {

    const [game, setGame] = useState([])

    useEffect(() => {

        //logica della chiamata fetch
        async function fetchGames() {

            try {
                const response = await fetch(`${VITE_API_URL}/${gameId}`)
                const data = await response.json()
                setGames(data)
            } catch (error) {
                console.error(error);
            }
        }

        //eseguo la mia chiamata al montaggio dei componenti richiamando la funzione
        fetchGames()

    }, [])

    return game //restituisco il dettaglio del singolo gioco
}