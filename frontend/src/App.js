import React from "react";
import "./index.css";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./components/HomePage";
import FavoritesScreen from "./components/FavoritesScreen";
import { RenderConnections } from "./components/ConnectionDisplay";
import { Switch } from "@material-ui/core";

function App() {
  return (
    <div>
      <BrowserRouter>
        <LandingPage basename='/'/>
        <Route path="/favorites" component={FavoritesScreen} />
        <Route path="/split" component={RenderConnections} />
  
      </BrowserRouter>
    </div>
  );
}

export default App;
