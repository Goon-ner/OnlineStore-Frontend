import React, { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar'
import { observer } from 'mobx-react-lite'
import { useStore } from './index'
import { check } from './http/userAPI'

const App = observer(() => {
  const { user } = useStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check()
      .then((data) => {
        user.setUser(true)
        user.setIsAuth(true)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Spinner animation={'grow'} />
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  )
})

export default App
