import { useContext, useState } from "react";
import { GameContext } from "../context/GlobalContext";

export default function Searchbar() {

    //lo state che gestisce la stringa di ricerca tramite input controllato
    const { searchQuery, setSearchQuery } = useContext(GameContext)
    console.log(searchQuery);


    return (

        <>
            <input type="text" onChange={e => setSearchQuery(e.target.value)} />

        </>
    )

}