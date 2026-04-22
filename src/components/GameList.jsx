import { useContext, useState } from "react";
import { GameContext, FavoriteContext, CompareContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import { faCodeCompare } from '@fortawesome/free-solid-svg-icons';

export default function GameList() {

    //prendo la lista di tutti i giochi + la stringa per il filtro di ricerca
    const { games, searchQuery, filters } = useContext(GameContext)
    //destruttura per usare i fav
    const { favGames, toggleFav } = useContext(FavoriteContext)
    //destruttura per i giochi comp
    const { compGames, toggleComp } = useContext(CompareContext)

    const gamesList = games.filter(game => {
        //filtrami i contenuti in cui game.title contiene il valore di searchQuery, tutto lowerCase
        const searchGame = game.title.toLowerCase().includes(searchQuery.toLowerCase());

        //filtrami tutti i game.category che sono uguali a filters
        const searchCategory = filters.category === "" || game.category === filters.category
        return searchGame && searchCategory
    })

    //ordiniamo i giochi in ordine alfabetico 
    //inizio copiando tutto l'array che ottengo come risultato da gameList
    const sortedGames = [...gamesList].sort((a, b) => {
        //gli dico se farlo dritto o in reverse
        if (filters.order === "dritto") {
            return a.title.localeCompare(b.title)
        } else { //altrimenti in reverse
            return b.title.localeCompare(a.title)
        }
    })


    return (

        <>
            {
                sortedGames.map((game) => {
                    // CALCOLIAMO LO STATO QUI DENTRO PER OGNI GIOCO
                    const isFavorite = favGames.some(fav => fav.id === game.id);
                    const isToCompare = compGames.some(comp => comp.id === game.id);

                    return (
                        <nav key={game.id} className="card">

                            <div className="img-container" >
                            </div>

                            <Link className="card-link" to={`/game/${game.id}`} >
                                <p><strong>{game.title}</strong></p>
                            </Link>

                            {/* Bottone Preferiti Dinamico */}
                            <button onClick={() => toggleFav(game)}>
                                <FontAwesomeIcon
                                    icon={isFavorite ? faSolidHeart : faRegularHeart}
                                    color={isFavorite ? "red" : "black"}
                                />
                            </button>

                            {/* Bottone Confronto Dinamico */}
                            <button onClick={() => toggleComp(game)}>
                                <FontAwesomeIcon
                                    icon={faCodeCompare}
                                    color={isToCompare ? "blue" : "black"}
                                />
                            </button>


                        </nav>
                    );
                })
            }
        </>
    )
}