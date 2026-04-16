import { BrowserRouter, Routes, Route } from "react-router-dom"
import DefualtLayout from "./layout/DefaultLayout"
import Homepage from "./Pages/Homepage"
import GameDetails from "./Pages/GameDetails"
import Compare from "./Pages/Compare"
import Favorite from "./Pages/Favorite"
import { GameProvider, FavoriteProvider, CompareProvider } from "./context/GlobalContext"

function App() {


  return (

    <GameProvider>
      <FavoriteProvider>
        <CompareProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<DefualtLayout />}>
                <Route path="/" Component={Homepage} />
                <Route path="/game/:id" Component={GameDetails} />
                <Route path="/compare" Component={Compare} />
                <Route path="/favorite" Component={Favorite} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CompareProvider>
      </FavoriteProvider>
    </GameProvider>
  )
}

export default App
