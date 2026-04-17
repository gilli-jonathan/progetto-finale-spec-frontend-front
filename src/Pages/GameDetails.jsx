import { useParams } from "react-router-dom"
import { useGameDetails } from "../hooks/useGameDetails"

export default function GameDetails() {

    //recupero il parametro (id del gioco)
    const { id } = useParams()
    //uso l'hook per ottenere i dettagli
    const responseObj = useGameDetails(id)
    console.log(responseObj);

    //caricamento della risposta
    if (!responseObj) {
        return <p>caricamento in corso</p>
    }

    //destrutturo la risposta per ottenere i dati del gioco
    const { zeldagame } = responseObj


    return (
        <>
            <h2>Pagina del dettaglio di {zeldagame.title} </h2>
            <p>{zeldagame.description}</p>

        </>
    )
}