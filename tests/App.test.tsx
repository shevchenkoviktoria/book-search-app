import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { App } from '../src/App'

describe('App', () => {
  it('displays login page when not authenticated', () => {
    render(<App />)
    expect(screen.getByText(/book search app/i)).toBeInTheDocument()
  })

  it('displays welcome message and search page when authenticated', () => {
    render(<App />)

    // Simulate login
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' },
    })
    fireEvent.click(screen.getByRole('button', { name: /login/i }))

    expect(screen.getByText(/welcome, testuser/i)).toBeInTheDocument()
  })

  it('displays logout button when authenticated', () => {
    render(<App />)

    // Simulate login
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' },
    })
    fireEvent.click(screen.getByRole('button', { name: /login/i }))

    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument()
  })
})
