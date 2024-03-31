import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/main.css'
import AppFunction from './context/Context.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
   <BrowserRouter>
 <AppFunction>
      <App />
 </AppFunction>
   </BrowserRouter>
  // </React.StrictMode>,
)
