import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CurrencyTradeShare from './currency-trade-share'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CurrencyTradeShare />
  </StrictMode>
)
