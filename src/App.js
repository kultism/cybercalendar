import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios'
// axios.defaults.baseURL = 'http://167.172.101.116:8000/';


// console.log(firstItem)

function App() {
  const [name, setName] = useState()
  const firstItem = axios.get('filter/hosts').then((response) => {
    console.log(response)
    return setName(response.data[0].name)
  })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {name}
        </a>
      </header>
    </div>
  );
}

export default App;
