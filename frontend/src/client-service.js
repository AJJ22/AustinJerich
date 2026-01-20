const API_BASE = (process.env.REACT_APP_API_URL || 'http://localhost:3001').replace(/\/$/, '')

async function request(path, opts) {
  const res = await fetch(`${API_BASE}${path}`, opts)
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || res.statusText || 'API error')
  }
  if (res.status === 204) return null
  return res.json()
}

export const getMovies = () => request('/movies')
export const getMovie = id => request(`/movies/${id}`)
export const addMovie = movie => request('/movies', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(movie)
})
export const updateMovie = (id, movie) => request(`/movies/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(movie)
})
export const deleteMovie = id => request(`/movies/${id}`, { method: 'DELETE' })