import React from "react";
import "./index.css";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./components/HomePage";
import FavoritesScreen from "./components/FavoritesScreen";


function App() {
  return (
    <div>

      <BrowserRouter>
        <LandingPage basename='/'/>
        <Route path="/favorites" component={FavoritesScreen} />
      </BrowserRouter>

    </div>
  );
}

export default App;
