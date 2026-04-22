import { useContext, useState } from "react";
import { GameContext, FavoriteContext, CompareContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

export default function GameList() {

    //prendo la lista di tutti i giochi + la stringa per il filtro di ricerca
    const { games, searchQuery, filters } = useContext(GameContext)

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

    //destruttura per usare i fav
    const { favGames, toggleFav } = useContext(FavoriteContext)

    //destruttura per i giochi comp
    const { compGames, toggleComp } = useContext(CompareContext)

    return (

        <>
            <h3>elenco dei giochi</h3>
            {
                sortedGames.map((game => (


                    <nav key={game.id} className="card">

                        <Link to={`/game/${game.id}`} >
                            <h5>{game.title}</h5>
                        </Link>
                        <button onClick={() => toggleFav(game)}> aggiungi/togli dai preferiti</button>
                        <button onClick={() => toggleComp(game)}> aggiungi/togli x confronto</button>
                    </nav>
                )))
            }
        </>
    )
}