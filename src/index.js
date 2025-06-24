import React, { useMemo, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { SnackbarProvider } from 'notistack'

const Root = () => {
  const [darkMode, setDarkMode] = useState(true)

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light',
        primary: {
          main: '#1976d2',
        },
        background: {
          default: darkMode ? '#121212' : '#f4f4f4',
        }
      }
    }), [darkMode]
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={3000}
      >
        <App darkMode={darkMode} setDarkMode={setDarkMode} />
      </SnackbarProvider>
    </ThemeProvider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)

reportWebVitals()
