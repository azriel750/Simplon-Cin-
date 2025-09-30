import { createRoot } from 'react-dom/client'
import AppRouter from './appRouter.tsx';
import { StrictMode } from 'react'


createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <AppRouter />
    </StrictMode>,
)
