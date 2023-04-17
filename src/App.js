import React, { useState } from 'react';
import PortMap from './PortMap';
import ports from './ports';
import './App.css';

function App() {
  const [selectedPort, setSelectedPort] = useState(null);

  const handlePortSelect = (port) => {
    setSelectedPort(port);
  };

  return (
    <div className='map-container'>
      <div className="header">
        <h1>Cape Verde Ports</h1>
      </div>
      <div className="options-container">
        <h1>Cape Verde Ports</h1>
        <p>Select a port:</p>
        <ul>
          {ports.map((port) => (
            <li key={port.name}>
              <button onClick={() => handlePortSelect(port)}>
                {port.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <PortMap selectedPort={selectedPort} />
    </div>
  );
}

export default App;
