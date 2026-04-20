import { useContext } from "react"
import { CompareContext } from "../context/GlobalContext"
import { Link } from "react-router-dom";

export default function Compare() {

    const { compGames, toggleComp } = useContext(CompareContext)
    console.log(compGames);


    return (
        <>
            {
                compGames.map((game => (
                    <nav key={game.id}>
                        <Link to={`/game/${game.id}`} >
                            <h5>{game.title}</h5>
                        </Link>
                        <button onClick={() => toggleComp(game)}> aggiungi/togli</button>
                    </nav>
                )))
            }
        </>
    )
}