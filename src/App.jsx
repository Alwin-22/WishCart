import React from 'react'

import './App.css';
import Navbar from "./components/Navbar/navbar";
import Homepage from './components/Navbar/Homepage/Homepage';

const App = () => {
  return (
    <div className='App'>
      <Navbar/>
      <main>
        <Homepage/>
      </main>
    </div>

  )
}

export default App