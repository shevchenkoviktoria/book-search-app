import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { LoginPage } from '../src/LoginPage'

describe('LoginPage', () => {
  const onLoginMock = jest.fn()

  beforeEach(() => {})

  it('renders the username input and login button', () => {
    render(<LoginPage onLogin={onLoginMock} />)
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('calls onLogin with the username when login button is clicked', () => {
    render(<LoginPage onLogin={onLoginMock} />)
    const usernameInput = screen.getByLabelText(/username/i)
    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.click(screen.getByRole('button', { name: /login/i }))
    expect(onLoginMock).toHaveBeenCalledWith('testuser')
  })

  it('does not call onLogin when username is empty', () => {
    render(<LoginPage onLogin={onLoginMock} />)
    fireEvent.click(screen.getByRole('button', { name: /login/i }))
    expect(onLoginMock).not.toHaveBeenCalled()
  })
})
