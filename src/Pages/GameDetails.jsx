import { useParams } from "react-router-dom"
import { useGameDetails } from "../hooks/useGameDetails"
import { useContext } from "react"
import { FavoriteContext, CompareContext } from "../context/GlobalContext"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';

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
        // 
        <div className="detail-container">
            {/* Colonna Sinistra: La "Super Card" */}
            <div className="detail-visual">
                <div className="card retro-outset">
                    <div className="img-placeholder brutal-border img-detail-container">
                        <img src={zeldagame.image} alt={zeldagame.title} />
                    </div>

                    <div className="card-actions card-container">
                        <button className="retro-outset" onClick={() => toggleFav(zeldagame)}>
                            <FontAwesomeIcon
                                icon={isFavorite ? faSolidHeart : faRegularHeart}
                                color={isFavorite ? "red" : "black"}
                            />
                            <span>{isFavorite ? " Rimuovi dalla lista dei preferiti" : " Aggiungi tra i preferiti"}</span>
                        </button>

                        <button className="retro-outset" onClick={() => toggleComp(zeldagame)}>
                            <FontAwesomeIcon
                                icon={faShieldHalved}
                                color={isToCompare ? "blue" : "black"}
                            />
                            <span>{isToCompare ? "Sono timido, niente pragaroni, please" : "Confrontami con un altro gioco"}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Colonna Destra: Informazioni tecniche */}
            <div className="detail-info retro-outset">
                <h1 className="brutal-text">{zeldagame.title}</h1>
                <div className="badge-container card-container">
                    <span className="badge"><p><strong>Genere:</strong></p>{zeldagame.category}</span>

                    <span className="badge"><p><strong>Console:</strong></p>{zeldagame.console}</span>
                </div>

                <hr className="brutal-hr" />

                <section className="info-section">
                    <h3>Descrizione</h3>
                    <p>{zeldagame.description}</p>
                </section>

                <section className="info-section">
                    <h3>Storia</h3>
                    <p>{zeldagame.story}</p>
                </section>

                <div className="technical-grid">
                    <div className="tech-item">
                        <strong>Anno:</strong> {zeldagame.releaseYear}
                    </div>
                    <div className="tech-item">
                        <strong>Voto:</strong> {zeldagame.vote}/100
                    </div>
                    <div className="tech-item">
                        <strong>Remake:</strong> {zeldagame.remake ? "Sì" : "No"}
                    </div>
                </div>
            </div>
        </div>
    )
}