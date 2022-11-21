import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import useRouteElement from './hooks'

function App() {
  const routElement = useRouteElement()

  return <div>{routElement}</div>
}

export default App
