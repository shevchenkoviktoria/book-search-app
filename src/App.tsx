import React, { useState } from 'react'
import { SearchPage } from './SearchPage'
import { LoginPage } from './LoginPage'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from '@mui/material'

export const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const [username, setUsername] = useState<string | null>(null)
  const [averageSearchDuration, setAverageSearchDuration] = useState<number>(0)
  const [totalSearchTime, setTotalSearchTime] = useState<number>(0)
  const [searchCount, setSearchCount] = useState<number>(0)

  const handleLogin = (user: string) => {
    setUsername(user)
    setAuthenticated(true)
  }

  const handleLogout = () => {
    setUsername(null)
    setAuthenticated(false)
  }

  const updateAverageSearchDuration = (duration: number) => {
    const newTotalSearchTime = totalSearchTime + duration
    const newSearchCount = searchCount + 1
    const newAverage = newTotalSearchTime / newSearchCount

    setTotalSearchTime(newTotalSearchTime)
    setSearchCount(newSearchCount)
    setAverageSearchDuration(newAverage)
  }

  return (
    <Container maxWidth="md">
      {/* AppBar for header with authentication status */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {authenticated ? `Welcome, ${username}!` : 'Book Search App'}
          </Typography>
          {authenticated ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={() => handleLogin('User')}>
              Login
            </Button>
          )}
          <Box ml={2}>
            <Typography variant="body2">
              Avg Search Duration: {averageSearchDuration.toFixed(2)} ms
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Conditional rendering of SearchPage or LoginPage */}
      {authenticated ? (
        <SearchPage setSearchDuration={updateAverageSearchDuration} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </Container>
  )
}
