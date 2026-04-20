import { useContext, useEffect, useState } from "react"
import { CompareContext } from "../context/GlobalContext"
import { Link } from "react-router-dom";
const { VITE_API_URL } = import.meta.env;

export default function Compare() {

    const { compGames, toggleComp } = useContext(CompareContext)
    console.log(compGames);

    //creo uno state per conservare i dettagli per il confronto
    const [fullDetails, setFullDetails] = useState([])
    const [loading, setLoading] = useState(false) //per il render condizionale mentre l'utente aspetta

    //eseguo la mia chiamata ai dati tramite useEffect
    useEffect(() => {
        if (compGames.length > 0) {

            setLoading(true) //sto caricando 
            const promises = compGames.map(g => fetch(`${VITE_API_URL}/${g.id}`).then(res => res.json()))//logica per la chiamata API

            Promise.all(promises)
                .then(resu => {
                    setFullDetails(resu.map(r => r.zeldagame))//mappo la risposta e copio ogni game dentro fulldetails
                    setLoading(false)//fine caricamento
                })
                .catch(err => console.error('problemi nel caricare i dati per il confronto:', err))
        }
    }, [compGames]) //se cambia Compgames ovviamente devo rifare la chiamata

    if (compGames.length === 0) return <p>non ci sono giochi per il confronto</p>
    if (loading) return <p>caricamento dati in corso...</p>


    return (
        <>
            <div style={{ display: 'flex', gap: '20px' }}>
                {fullDetails.map(game => (
                    <div key={game.id} style={{ border: '1px solid #ccc', padding: '10px', flex: 1 }}>
                        <img src={game.image} alt={game.title} style={{ width: '100%' }} />
                        <h2>{game.title}</h2>
                        <p><strong>Categoria:</strong> {game.category}</p>
                        <p><strong>Anno:</strong> {game.releaseYear}</p>
                        <p><strong>Voto:</strong> {game.vote}/100</p>
                        <p><strong>Console:</strong> {game.console}</p>
                        <hr />
                        <p>{game.description}</p>
                    </div>
                ))}
            </div>
        </>
    )
}