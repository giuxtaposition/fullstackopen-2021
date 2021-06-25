import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router } from 'react-router-dom'
import theme from './components/theme'
import { ColorModeScript } from '@chakra-ui/react'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
