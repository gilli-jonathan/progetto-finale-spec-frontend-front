import { useContext } from "react";
import { FavoriteContext, CompareContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';

export default function Favorite() {
    // Prendiamo i dati dai contesti necessari
    const { favGames, toggleFav } = useContext(FavoriteContext);
    const { compGames, toggleComp } = useContext(CompareContext);

    // Se vuoi che anche i preferiti siano ordinati alfabeticamente come nella GameList:
    const sortedFavs = [...favGames].sort((a, b) => a.title.localeCompare(b.title));

    return (
        <div className="card-container">
            {
                sortedFavs.length > 0 ? (
                    sortedFavs.map((game) => {
                        // Verifichiamo lo stato per le icone
                        // In questa pagina isFavorite sarà sempre true, ma manteniamo la logica per coerenza
                        const isFavorite = favGames.some(fav => fav.id === game.id);
                        const isToCompare = compGames.some(comp => comp.id === game.id);

                        return (
                            <div key={game.id} className="card retro-outset">
                                {/* Contenitore Immagine */}
                                <div className="card-img-wrapper brutal-border">
                                    <img src={game.image} alt={game.title} />
                                </div>

                                {/* Titolo con Link */}
                                <Link className="card-link" to={`/game/${game.id}`}>
                                    <p className="card-title"><strong>{game.title}</strong></p>
                                </Link>

                                <p className="card-category">{game.category}</p>

                                {/* Footer della card con i bottoni */}
                                <div className="card-footer">
                                    <button className="icon-btn" onClick={() => toggleFav(game)}>
                                        <FontAwesomeIcon
                                            icon={isFavorite ? faSolidHeart : faRegularHeart}
                                            color={isFavorite ? "red" : "black"}
                                        />
                                    </button>

                                    <button className="icon-btn" onClick={() => toggleComp(game)}>
                                        <FontAwesomeIcon
                                            icon={faShieldHalved}
                                            color={isToCompare ? "blue" : "#ccc"}
                                        />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>Non hai ancora aggiunto giochi ai preferiti.</p>
                )
            }
        </div>
    );
}