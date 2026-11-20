import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { ScrollToTop } from './components/scrollTop.tsx'

createRoot(document.getElementById('root')!).render(
   <StrictMode>
    <AuthProvider>
      <BrowserRouter>
      <ScrollToTop/>
         <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
