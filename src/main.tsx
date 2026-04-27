import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './parabolica.css'
import './typography.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
