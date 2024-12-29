import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CurrencyConverter from './Componets/currencyConverter'
function App() {

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center  bg-no-repeat bg-cover bg-center h-screen sm:h-[75vh] md:h-[50vh] lg:h-[100vh] xl:h-[80vh]">
      <div className="container">

<CurrencyConverter /></div>
    </div>
 )
}

export default App
