import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PainelMestre from './painel-mestre.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PainelMestre />
  </StrictMode>,
)
