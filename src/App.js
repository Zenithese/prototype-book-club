import React from 'react';
import Reader from './components/reader'
import Highlights from './components/highlights'
import './assests/App.css';

function App() {
  return (
    <div className="App" style={{position: "absolute", height: "100%", width: "100%"}}>
      <Reader />
      <Highlights />
    </div>
  );
}

export default App;
