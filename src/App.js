import React from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios'
// axios.defaults.baseURL = 'http://167.172.101.116:8000/';
axios.get('filter/hosts').then((response) => {
  console.log(response)
})

function App() {
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
          Learn React a
        </a>
      </header>
    </div>
  );
}

export default App;
