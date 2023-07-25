import { useState } from 'react'
import './App.css'
import Card from './components/Card/Card';

function App() {
  const [count, setCount] = useState("");

  return (
    <>
      <Card/>
    </>
  )
}

export default App
