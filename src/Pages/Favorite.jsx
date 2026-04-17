import { useContext } from "react"
import { FavoriteContext } from "../context/GlobalContext"
import { Link } from "react-router-dom"

export default function Favorite() {

    const { favGames, toggleFav } = useContext(FavoriteContext)

    return (
        <>

            <h3>elenco dei preferiti</h3>
            {
                favGames.map((game => (
                    <nav key={game.id}>
                        <Link to={`/game/${game.id}`} >
                            <h5>{game.title}</h5>
                        </Link>
                        <button onClick={() => toggleFav(game)}> aggiungi/togli dai preferiti</button>
                    </nav>
                )))
            }
        </>
    )
}