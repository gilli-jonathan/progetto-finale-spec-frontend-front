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
            <div className="main-page">
                {/* Usiamo card-container per avere la griglia, ma limitata a 2 colonne se vuoi */}
                <div className="card-container" style={{ gridTemplateColumns: '1fr 1fr' }}>
                    {fullDetails.map(game => (
                        <div key={game.id} className="retro-outset">
                            {/* Immagine con bordo brutalista */}
                            <div className="card-img-wrapper brutal-border" style={{ height: '200px' }}>
                                <img src={game.image} alt={game.title} style={{ imageRendering: 'pixelated' }} />
                            </div>

                            <h2 className="brutal-text" style={{ fontSize: '1.5rem', marginTop: '1rem' }}>
                                {game.title}
                            </h2>

                            {/* Sezione dettagli evidenziati con retro-inset */}
                            <div className="technical-grid" style={{ marginTop: '10px' }}>
                                <div className="retro-inset">
                                    <strong>Categoria:</strong> {game.category}
                                </div>
                                <div className="retro-inset">
                                    <strong>Voto:</strong> {game.vote}/100
                                </div>
                                <div className="retro-inset">
                                    <strong>Console:</strong> {game.console}
                                </div>
                                <div className="retro-inset">
                                    <strong>Anno:</strong> {game.releaseYear}
                                </div>
                            </div>

                            <hr className="brutal-hr" style={{ margin: '15px 0' }} />

                            <p style={{ fontStyle: 'italic' }}>{game.description}</p>

                            {/* Bottone per rimuovere dal confronto usando lo stile reset */}
                            <button
                                className="reset-btn retro-outset"
                                onClick={() => toggleComp(game)}
                                style={{ width: '100%', marginTop: '15px' }}
                            >
                                RIMUOVI DAL CONFRONTO
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}