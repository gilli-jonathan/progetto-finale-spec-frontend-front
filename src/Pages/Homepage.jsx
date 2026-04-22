import GameList from "../components/GameList";
import FiltersForm from "../components/FiltersForm";

export default function Homepage() {

    return (
        <div className="main-page">
            <div className="filter-container">
                <FiltersForm />
            </div>
            <div className="card-container">
                <GameList />
            </div>
        </div>
    )
}