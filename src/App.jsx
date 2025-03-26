import { useState } from 'react'
import './App.css'
//import CoffeeDataComponent from './components/CoffeeDataComponent'
import CoffeeAxiosDataComponent from './components/CoffeeDataAxiosComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CoffeeAxiosDataComponent />
    </>
  )
}

export default App
