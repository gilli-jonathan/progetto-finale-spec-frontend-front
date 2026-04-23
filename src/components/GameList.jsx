import { useContext, useState, useMemo } from "react";
import { GameContext, FavoriteContext, CompareContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";
import GameCard from "./GameCard"; //aggiunta del componente card

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';

export default function GameList() {

    //prendo la lista di tutti i giochi + la stringa per il filtro di ricerca
    const { games, searchQuery, filters } = useContext(GameContext)
    //destruttura per usare i fav
    const { favGames, toggleFav } = useContext(FavoriteContext)
    //destruttura per i giochi comp
    const { compGames, toggleComp } = useContext(CompareContext)

    const gameList = useMemo(() => {
        //impacchetto le 2 logiche dentro un useMemo

        const filter = games.filter(game => {
            //filtrami i contenuti in cui game.title contiene il valore di searchQuery, tutto lowerCase
            const searchGame = game.title.toLowerCase().includes(searchQuery.toLowerCase());
            //filtrami tutti i game.category che sono uguali a filters
            const searchCategory = filters.category === "" || game.category === filters.category

            return searchGame && searchCategory
        })

        //ordiniamo i giochi in ordine alfabetico 
        //inizio copiando tutto l'array che ottengo come risultato da gameList
        return [...filter].sort((a, b) => {
            //gli dico se farlo dritto o in reverse
            if (filters.order === "dritto") {
                return a.title.localeCompare(b.title)
            } else { //altrimenti in reverse
                return b.title.localeCompare(a.title)
            }
        })
    }, [games, searchQuery, filters]) // Si ricalcola solo se cambiano i dati o i filtri

    return (

        <>
            {gameList.map((game) => {
                // CALCOLIAMO LO STATO QUI DENTRO PER OGNI GIOCO
                const isFavorite = favGames.some(fav => fav.id === game.id);
                const isToCompare = compGames.some(comp => comp.id === game.id);

                return (

                    <GameCard
                        key={game.id} // Indispensabile per React
                        game={game}   // <--- QUI passi l'oggetto al figlio!
                        isFavorite={isFavorite}
                        isToCompare={isToCompare}
                        onToggleFav={toggleFav}
                        onToggleComp={toggleComp}
                    />

                );
            })
            }
        </>
    )
}