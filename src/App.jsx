import { Route, Routes } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage'



function App() {

  return (
   <>
     <div className="flex">
      <Sidebar/>
      <Routes>
        <Route  path="/"   element={<HomePage />} />
        <Route  path="/favourites"   element={<FavoritesPage />} />
      </Routes>
     </div>
   </>
  )
}

export default App
