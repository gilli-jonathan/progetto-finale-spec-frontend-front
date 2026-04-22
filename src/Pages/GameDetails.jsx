import { useParams } from "react-router-dom"
import { useGameDetails } from "../hooks/useGameDetails"
import { useContext } from "react"
import { FavoriteContext, CompareContext } from "../context/GlobalContext"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import { faCodeCompare } from '@fortawesome/free-solid-svg-icons';

export default function GameDetails() {

    const { favGames, toggleFav } = useContext(FavoriteContext)//sotto da errore.. ok
    const { compGames, toggleComp } = useContext(CompareContext)

    const { id } = useParams()  //recupero il parametro (id del gioco)

    const responseObj = useGameDetails(id) //uso l'hook per ottenere i dettagli
    console.log(responseObj);

    if (!responseObj) { return <p>caricamento in corso</p> } //caricamento della risposta

    const { zeldagame } = responseObj //destrutturo la risposta per ottenere i dati del gioco

    const isFavorite = favGames.some(fav => fav.id === zeldagame.id);
    const isToCompare = compGames.some(comp => comp.id === zeldagame.id);

    return (
        <div>
            <h2>Pagina del dettaglio di {zeldagame.title} </h2>
            <p>{zeldagame.description}</p>
            <button onClick={() => toggleFav(zeldagame)}> aggiungi ai preferiti</button>

            <div key={zeldagame.id} className="card">

                <div className="img-container" >
                </div>

                {/* Bottone Preferiti Dinamico */}
                <button onClick={() => toggleFav(zeldagame)}>
                    <FontAwesomeIcon
                        icon={isFavorite ? faSolidHeart : faRegularHeart}
                        color={isFavorite ? "red" : "black"}
                    />
                </button>

                {/* Bottone Confronto Dinamico */}
                <button onClick={() => toggleComp(zeldagame)}>
                    <FontAwesomeIcon
                        icon={faCodeCompare}
                        color={isToCompare ? "blue" : "black"}
                    />
                </button>


            </div>

        </div>
    )
}