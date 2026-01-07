import { configureStore } from '@reduxjs/toolkit'
import { errorReducer } from './utils/errorState'
import { combineReducers } from 'redux'
import { Provider } from 'react-redux'
import React from 'react'
import App from './App'
import ReactDOM from 'react-dom/client'
import './index.css'
import './App.css'

const rootReducer = combineReducers({
  errors: errorReducer
})
export const store = configureStore({ reducer: rootReducer })

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)