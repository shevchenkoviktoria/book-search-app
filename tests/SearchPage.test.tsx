import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { SearchPage } from '../src/SearchPage'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mockAxios = new MockAdapter(axios)

describe('SearchPage', () => {
  const setSearchDurationMock = jest.fn()

  beforeEach(() => {
    mockAxios.reset()
  })

  it('renders the search input', () => {
    render(<SearchPage setSearchDuration={setSearchDurationMock} />)
    expect(screen.getByLabelText(/search for books/i)).toBeInTheDocument()
  })

  it('displays loading indicator while fetching data', async () => {
    render(<SearchPage setSearchDuration={setSearchDurationMock} />)
    mockAxios.onGet(/search\.json/).reply(200, { docs: [], numFound: 0 })

    fireEvent.change(screen.getByLabelText(/search for books/i), {
      target: { value: 'React' },
    })

    expect(screen.getByRole('progressbar')).toBeInTheDocument()

    await waitFor(() =>
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    )
  })

  it('fetches and displays books', async () => {
    render(<SearchPage setSearchDuration={setSearchDurationMock} />)
    mockAxios.onGet(/search\.json/).reply(200, {
      docs: [
        {
          key: 'OL12345M',
          title: 'React for Beginners',
          author_name: ['John Doe'],
          edition_count: 5,
          first_publish_year: 2020,
        },
      ],
      numFound: 1,
    })

    fireEvent.change(screen.getByLabelText(/search for books/i), {
      target: { value: 'React' },
    })

    await waitFor(() => {
      expect(screen.getByText('React for Beginners')).toBeInTheDocument()
    })
  })

  it('handles API errors gracefully', async () => {
    render(<SearchPage setSearchDuration={setSearchDurationMock} />)
    mockAxios.onGet(/search\.json/).reply(500)

    fireEvent.change(screen.getByLabelText(/search for books/i), {
      target: { value: 'React' },
    })

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch books/i)).toBeInTheDocument()
    })
  })
})
