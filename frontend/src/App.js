import React from 'react';
import './index.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Logo from './components/Logo';
import SearchBox from './components/SearchBox';
import FavoritesScreen from './components/FavoritesScreen';


function App() {
  return (
  <BrowserRouter>
    <div className="grid-container">
      <header className="header">
          <Logo />
      </header>
      <main className='main'>  
        <div className='content'>
      <Route path="/"  component={SearchBox} /> 
      <Route path="/favorites"  component={FavoritesScreen} /> 
        </div>
      </main>
    </div>
  </BrowserRouter>

  )
  
}

export default App;
