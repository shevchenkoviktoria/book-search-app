import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { AuthProvider } from './AuthContext'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App /> {/* Ensure App is wrapped with AuthProvider */}
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
