import React from 'react'
import ReactDOM from 'react-dom'
import store from './components/store'
import { Provider } from 'react-redux'
import App from './App'
import anecdoteService from './services/anecdotes'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)