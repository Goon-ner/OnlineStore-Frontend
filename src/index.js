import React, { createContext, useContext } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import UserStore from './store/UserStore'
import DeviceStore from './store/DeviceStore'

export const Context = createContext(null)
export const useStore = () => {
  const context = useContext(Context)
  if (context === null) {
    throw new Error('Have no context')
  }

  return context
}

ReactDOM.render(
  <Context.Provider
    value={{ user: new UserStore(), device: new DeviceStore() }}
  >
    <App />
  </Context.Provider>,
  document.getElementById('root')
)
