import { useState } from 'react'
import ReactPlayground from './ReactPlayground';
import { PlaygroundProvider } from './ReactPlayground/PlaygroundProvider';
import './App.css';
function App() {

  return (
    <>
    <PlaygroundProvider>

      <ReactPlayground/>
    </PlaygroundProvider>
    </>
  )
}

export default App
