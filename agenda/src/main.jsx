import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PainelMestre from './painel-mestre.jsx'
import PlanoSemanal from './plano-semanal.jsx'

const routes = {
  '/': PainelMestre,
  '/plano-semanal': PlanoSemanal,
}

const Page = routes[window.location.pathname] ?? PainelMestre

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Page />
  </StrictMode>,
)
