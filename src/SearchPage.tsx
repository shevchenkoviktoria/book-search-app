import React, { useState, useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  CircularProgress,
  Pagination,
  Button,
  InputAdornment,
} from '@mui/material'
import axios from 'axios'

type Book = {
  key: string
  title: string
  author_name?: string[]
  edition_count: number
  first_publish_year?: number
}

type SearchPageProps = {
  setSearchDuration: (duration: number) => void
}

export const SearchPage: React.FC<SearchPageProps> = ({
  setSearchDuration,
}) => {
  const [query, setQuery] = useState<string>('')
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [pageCount, setPageCount] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [error, setError] = useState<string | null>(null)
  const [durations, setDurations] = useState<number[]>([])

  useEffect(() => {
    const fetchBooks = async () => {
      if (!query) return

      setLoading(true)
      const start = Date.now()

      try {
        const response = await axios.get(
          `https://openlibrary.org/search.json`,
          {
            params: { q: query, page: currentPage },
          }
        )
        const data = response.data
        setBooks(data.docs)
        setPageCount(Math.ceil(data.numFound / 100))
        setError(null)
      } catch (error) {
        console.error(error)
        setError('Failed to fetch books. Please try again.')
      } finally {
        const end = Date.now()
        const duration = end - start
        setDurations((prev) => [...prev, duration])
        setSearchDuration(
          durations.reduce((a, b) => a + b, 0) / durations.length || duration
        )
        setLoading(false)
      }
    }

    const delayDebounceFn = setTimeout(() => {
      fetchBooks()
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [query, currentPage, setSearchDuration])

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
  }

  return (
    <Box mt={5}>
      <Typography variant="h5" gutterBottom>
        Search for Books
      </Typography>

      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        <TextField
          label="Search for books..."
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
          margin="normal"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => setQuery(query)}
          sx={{ ml: 2, mt: 1 }}
        >
          <SearchIcon/>
        </Button>
      </Box>

      {error && (
        <Box mt={2} textAlign="center" color="error.main">
          <Typography variant="body2">{error}</Typography>
        </Box>
      )}

      {loading ? (
        <Box textAlign="center" mt={2}>
          <CircularProgress />
          <Typography variant="body2">Loading...</Typography>
        </Box>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Author</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Editions</TableCell>
                  <TableCell>First Published</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.map((book) => (
                  <TableRow key={book.key}>
                    <TableCell>
                      {book.author_name ? book.author_name.join(', ') : 'N/A'}
                    </TableCell>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.edition_count}</TableCell>
                    <TableCell>{book.first_publish_year || 'N/A'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box mt={3} display="flex" justifyContent="center">
            <Pagination
              count={pageCount}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}
    </Box>
  )
}
