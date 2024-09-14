import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// import 'primereact/resources/themes/lara-light-blue/theme.css';  // Make sure your theme supports gridlines
// import 'primereact/resources/primereact.min.css';                // Core CSS
// import 'primeicons/primeicons.css';                              // Icons

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
