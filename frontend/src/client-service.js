const API_BASE = (process.env.REACT_APP_API_URL__PROD || 'http://localhost:3001').replace(/\/$/, '')

async function request(path, opts) {
  const res = await fetch(`${API_BASE}${path}`, opts)
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || res.statusText || 'API error')
  }
  if (res.status === 204) return null
  return res.json()
}

export const getBooks = () => request('/books')
export const getBook = id => request(`/books/${id}`)
export const addBook = book => request('/books', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(book)
})
export const updateBook = (id, book) => request(`/books/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(book)
})
export const deleteBook = id => request(`/books/${id}`, { method: 'DELETE' })