// App.js

import './App.css';
import React from 'react';
import NavBar from './components/NavBar';
import GameGrid from './components/GameGrid';

const App: React.FC = () => {
  return (
    <div>
      <NavBar />
      {/* GameGrid component will go here */}
      <GameGrid />
    </div>
  );
};

export default App;