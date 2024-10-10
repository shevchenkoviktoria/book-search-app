import React, { useState } from 'react'
import { TextField, Button, Box } from '@mui/material'

type LoginPageProps = {
  onLogin: (username: string) => void
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('')

  const handleLogin = () => {
    if (username.trim()) {
      onLogin(username)
    }
  }

  return (
    <Box mt={5} textAlign="center">
      <TextField
        size="medium"
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        sx={{ ml: 2, mt: 1 }}
      >
        Login
      </Button>
    </Box>
  )
}
