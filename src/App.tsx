import { ToastContainer } from 'react-toastify'
import './App.css'
import { useRouteElement } from './hooks'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  const routElement = useRouteElement()

  return (
    <div>
      {routElement}
      <ToastContainer />
    </div>
  )
}

export default App
