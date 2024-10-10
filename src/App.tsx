import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from '@mui/material'
import { LoginPage } from './LoginPage'
import { SearchPage } from './SearchPage'

export const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const [username, setUsername] = useState<string | null>(null)
  const [searchDuration, setSearchDuration] = useState<number>(0)

  const handleLogin = (user: string) => {
    setUsername(user)
    setAuthenticated(true)
  }

  const handleLogout = () => {
    setUsername(null)
    setAuthenticated(false)
  }

  return (
    <Router>
      <Container maxWidth="md">
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {authenticated ? `Welcome, ${username}!` : 'Book Search App'}
            </Typography>
            {authenticated && (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            )}
            <Box ml={2}>
              <Typography variant="body2">
                Avg Search Duration: {searchDuration.toFixed(2)} ms
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>

        {authenticated ? (
          <SearchPage setSearchDuration={setSearchDuration} />
        ) : (
          <LoginPage onLogin={handleLogin} />
        )}
      </Container>
    </Router>
  )
}

export default App
