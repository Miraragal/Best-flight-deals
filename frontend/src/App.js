import React from 'react';
import './index.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Logo from './components/LogoComponent';
import SearchScreen from './components/HomeScreen';
import FavoritesScreen from './components/FavoritesScreen';
import FlightsScreen from './components/FlightsScreen';

function App() {
  return (
  <BrowserRouter>
    <div className="grid-container">
      <header className="header">
        <div className="logo">
          <Logo />
        </div>
      </header>
      <main className='main'>  
        <div className='content'>
      <Route path="/home"  component={SearchScreen} /> 
      <Route path="/flights" component={FlightsScreen} /> 
      <Route path="/favorites"  component={FavoritesScreen} /> 
        </div>
      </main>
    </div>
  </BrowserRouter>

  )
  
}

export default App;
