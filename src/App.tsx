import { ToastContainer } from 'react-toastify'
import './App.css'
import { useRouteElement } from './hooks'
import 'react-toastify/dist/ReactToastify.css'
import { useContext, useEffect } from 'react'
import { LocalStorageEventTarget } from './utils'
import { AppContext } from './contexts/app.context'
function App() {
  const routElement = useRouteElement()
  const { reset } = useContext(AppContext)
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('removeLS', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('removeLS', reset)
    }
  }, [reset])

  return (
    <div>
      {routElement}
      <ToastContainer />
    </div>
  )
}

export default App
