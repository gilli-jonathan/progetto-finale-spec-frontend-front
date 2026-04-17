import { useParams } from "react-router-dom"
import { useGameDetails } from "../hooks/useGameDetails"
import { useContext } from "react"
import { FavoriteContext } from "../context/GlobalContext"

export default function GameDetails() {


    const { id } = useParams()  //recupero il parametro (id del gioco)

    const responseObj = useGameDetails(id) //uso l'hook per ottenere i dettagli
    console.log(responseObj);

    if (!responseObj) { return <p>caricamento in corso</p> } //caricamento della risposta

    const { zeldagame } = responseObj //destrutturo la risposta per ottenere i dati del gioco

    const { favGames, toggleFav } = useContext(FavoriteContext)


    return (
        <>
            <h2>Pagina del dettaglio di {zeldagame.title} </h2>
            <p>{zeldagame.description}</p>
            <button onClick={() => toggleFav(game)}> aggiungi ai preferiti</button>

        </>
    )
}