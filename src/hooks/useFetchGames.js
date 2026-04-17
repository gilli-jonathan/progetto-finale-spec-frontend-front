import { useEffect, useState } from "react";
const { VITE_API_URL } = import.meta.env;

//hook per avere tutti i giochi
export function useFetchGames() {

    const [games, setGames] = useState([])

    useEffect(() => {

        //logica della chiamata fetch
        async function fetchGames() {

            try {
                const response = await fetch(VITE_API_URL)
                const data = await response.json()
                setGames(data)
            } catch (error) {
                console.error(error);
            }
        }

        //eseguo la mia chiamata al montaggio dei componenti richiamando la funzione
        fetchGames()

    }, [])

    //una volta andata a buon fine restituisco l'array games con dentro le risposte
    return games
}

