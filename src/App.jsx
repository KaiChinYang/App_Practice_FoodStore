import { useState } from 'react'
import './App.css'
import { Routes,Route } from "react-router-dom";
import Navbar from './components/navbars';
import Home from './pages/home';
import Favorites from './pages/favorites';
import Details from './pages/details';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div>
      <div className="min-h-screen p-6 bg-white text-gray-600 text-lg">
        <Navbar />
        <Routes>
          <Route path="/App_Practice_FoodStore/" element={<Home />} />
          <Route
            path="/App_Practice_FoodStore/favorites"
            element={<Favorites />}
          />
          <Route
            path="/App_Practice_FoodStore/recipe-item/:id"
            element={<Details />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App
