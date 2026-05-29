import { useEffect, useState } from "react";
import { pic } from "../utils/pic";

const { VITE_API_URL } = import.meta.env;

// Hook per avere tutti i giochi
export function useFetchGames() {
    const [games, setGames] = useState([]);

    useEffect(() => {

        // Logica della chiamata fetch
        async function fetchGames() {
            try {
                const response = await fetch(VITE_API_URL);
                const data = await response.json(); // Questi sono i dati originali

                // Mergiamo le immagini con map e find
                const mergedData = data.map(game => {
                    // Cerca l'immagine da 'pic'
                    const matchingImageObj = pic.find(img => img.id === game.id);

                    // Ritorna il gioco originale con l'immagine sostituita
                    return {
                        ...game, //copio l'oggetto game in più aggiungo l'atributo image
                        image: matchingImageObj ? matchingImageObj.image : "/placeholder.jpg" //se true aggiungo l'image, altrimenti link triste
                    };
                });

                // ora che ho tutto oggetto + immagine lo ttascrivo come GAMES
                setGames(mergedData);

            } catch (error) {
                console.error("Errore nel recupero dei giochi:", error);
            }
        }

        // Eseguo la mia chiamata al montaggio
        fetchGames();

    }, []); // L'array vuoto per fare tutto solo una sola volta

    // Restituisco l'array games
    return games;
}