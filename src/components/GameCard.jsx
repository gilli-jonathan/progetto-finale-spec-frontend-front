import { memo } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';

//tutto avvolto con MEMO
const GameCard = memo(function GameCard({ game, isFavorite, isToCompare, onToggleFav, onToggleComp }) {

    return (

        //copio tutta la logica della card ad eccezione del DIV genitore
        <div className="card retro-outset">
            <div className="card-img-wrapper brutal-border">
                <img src={game.image} alt={game.title} />
            </div>

            <Link className="card-link" to={`/game/${game.id}`}>
                <p className="card-title"><strong>{game.title}</strong></p>
            </Link>

            <p className="card-category">{game.category}</p>

            <div className="card-footer">
                <button className="icon-btn" onClick={() => onToggleFav(game)}>
                    <FontAwesomeIcon
                        icon={isFavorite ? faSolidHeart : faRegularHeart}
                        color={isFavorite ? "red" : "black"}
                    />
                </button>

                <button className="icon-btn" onClick={() => onToggleComp(game)}>
                    <FontAwesomeIcon
                        icon={faShieldHalved}
                        color={isToCompare ? "blue" : "#ccc"}
                    />
                </button>
            </div>
        </div>
    );
});

export default GameCard;