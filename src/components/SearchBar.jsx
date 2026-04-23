import { useContext, useState, useCallback, useMemo } from "react";
import { GameContext } from "../context/GlobalContext";
import { debounce } from "../utils/debounce"

export default function Searchbar() {

    //lo state che gestisce la stringa di ricerca tramite input controllato
    const { searchQuery, setSearchQuery, inputValue, setInputValue } = useContext(GameContext)

    // const [inputValue, setInputValue] = useState('')

    // 2. Creiamo la callback debouncata
    // Usiamo useMemo per assicurarci che la funzione debouncata sia creata UNA SOLA VOLTA
    const debouncedUpdateSearch = useMemo(
        () => debounce((value) => {
            console.log("Eseguo ricerca per:", value);
            setSearchQuery(value); // Questa è la callback che aggiorna il context
        }, 500),
        [setSearchQuery] // Dipendenza: se il context cambia (raro), si aggiorna
    );

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);          // Aggiorna subito lo stile dell'input
        debouncedUpdateSearch(value);  // Chiama la versione "ritardata" per il filtro
    };

    return (

        <>
            <input
                className="retro-inset"
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="Cerca un gioco..."
            />
        </>
    )

}