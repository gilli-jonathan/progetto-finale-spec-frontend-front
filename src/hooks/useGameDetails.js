import { useState, useEffect } from "react"
const { VITE_API_URL } = import.meta.env;


export function useGameDetails(gameId) {

    //assegno null perché mettere un array vuoto viene considerato già come risposta
    const [game, setGame] = useState(null)


    useEffect(() => {

        //logica della chiamata fetch
        async function fetchGames() {

            try {
                const response = await fetch(`${VITE_API_URL}/${gameId}`)
                const data = await response.json()
                setGame(data)
            } catch (error) {
                console.error(error);
            }
        }

        //eseguo la mia chiamata al montaggio dei componenti richiamando la funzione
        fetchGames()

    }, [gameId] //metto gameId come dipendenza così che se dovesse cambiare dall'url verebbe aggiornato
    )

    return game //restituisco il dettaglio del singolo gioco
}