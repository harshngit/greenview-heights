import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// Hash routing works on any static host without server rewrites.
// Set VITE_ROUTER=browser for clean URLs on hosts that support SPA rewrites.
const Router = import.meta.env.VITE_ROUTER === 'browser' ? BrowserRouter : HashRouter

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
)
