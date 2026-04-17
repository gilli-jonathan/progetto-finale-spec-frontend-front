import { useContext, useState } from "react";
import { GameContext } from "../context/GlobalContext";

export default function GameList() {

    //prendo la lista di tutti i giochi + la stringa per il filtro di ricerca
    const { games, searchQuery } = useContext(GameContext)

    //filtrami i contenuti in cui game.title contiene il valore di searchQuery, tutto lowerCase
    const gamesList = games.filter(game => game.title.toLowerCase().includes(searchQuery.toLowerCase()))

    return (

        <>
            <h3>elenco dei giochi</h3>
            {
                gamesList.map((game => (
                    <h5 key={game.id}>{game.title}</h5>
                )))
            }
        </>
    )

}