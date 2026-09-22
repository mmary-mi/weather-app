import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material'

export const theme = createTheme({
  typography: {
    fontFamily: 'Nunito'
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
