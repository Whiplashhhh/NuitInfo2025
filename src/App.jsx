import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Nuit de l'Info 2025</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Compteur : {count}
        </button>
        <p>
          Bienvenue sur le site de la Nuit de l'Info 2025
        </p>
      </div>
      <p className="read-the-docs">
        Un projet web React sans backend - Consultez simplement le site
      </p>
    </>
  )
}

export default App
