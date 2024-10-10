// SearchPage.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SearchPage } from '../SearchPage'; // Ensure this path is correct

// Mock the axios module
jest.mock('axios');

describe('SearchPage', () => {
  const setSearchDurationMock = jest.fn();
  const fetchBooksMock = jest.fn(); // Create a mock for fetchBooks

  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous calls to mocked functions
  });

  it('renders the search input', () => {
    render(<SearchPage setSearchDuration={setSearchDurationMock} fetchBooks={fetchBooksMock} />);
    expect(screen.getByLabelText(/search for books/i)).toBeInTheDocument();
  });

  it('displays loading indicator while fetching data', async () => {
    render(<SearchPage setSearchDuration={setSearchDurationMock} fetchBooks={fetchBooksMock} />);

    // Mock a successful API response
    fetchBooksMock.mockResolvedValueOnce({
      data: { docs: [], numFound: 0 },
    });

    fireEvent.change(screen.getByLabelText(/search for books/i), {
      target: { value: 'React' },
    });

    // Check if loading indicator is present
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    // Wait for loading indicator to be removed
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });
  });

  it('fetches and displays books', async () => {
    render(<SearchPage setSearchDuration={setSearchDurationMock} fetchBooks={fetchBooksMock} />);

    // Mock an API response with book data
    fetchBooksMock.mockResolvedValueOnce({
      data: {
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
      },
    });

    fireEvent.change(screen.getByLabelText(/search for books/i), {
      target: { value: 'React' },
    });

    // Wait for the book title to be rendered in the document
    await waitFor(() => {
      expect(screen.getByText('React for Beginners')).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    render(<SearchPage setSearchDuration={setSearchDurationMock} fetchBooks={fetchBooksMock} />);

    // Mock an API error response
    fetchBooksMock.mockRejectedValueOnce(new Error('Failed to fetch'));

    fireEvent.change(screen.getByLabelText(/search for books/i), {
      target: { value: 'React' },
    });

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByText(/failed to fetch books/i)).toBeInTheDocument();
    });
  });
});
