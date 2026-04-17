import { useContext } from "react";
import { GameContext } from "../context/GlobalContext";

export default function GameList() {

    const GamesList = useContext(GameContext)
    const games = GamesList
    console.log(games);


    return (

        <>
            <h3>elenco dei giochi</h3>
            {
                games.map((game => (
                    <h5 key={game.id}>{game.title}</h5>
                )))
            }
        </>
    )

}