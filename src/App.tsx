import React from 'react';
import './App.css';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Body from "./components/body/Body";
import { Routes, Route } from 'react-router-dom';
import Game from "./components/body/game/Game";

// // Pour l'exemple, voici un faux composant Jeu si tu n'en as pas encore
// const GamePlaceholder = () => <h1 style={{color:'white'}}>Ici c'est le Jeu !</h1>;

function App() {
  return (
    <div className="App">
      <Header />
        <Routes>
            <Route path="/" element={<Body />} />
            <Route path="/game" element={<Game />} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
