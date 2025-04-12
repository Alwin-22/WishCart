import React from 'react'

import './App.css';
import Navbar from "./components/Navbar/navbar";
import Routing from './components/Routing/routing';

const App = () => {
  return (
    <div className='App'>
      <Navbar/>
      <main>
        <Routing />
      </main>
    </div>

  )
}

export default App