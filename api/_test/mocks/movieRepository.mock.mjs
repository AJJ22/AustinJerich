/**
 * Mock Movie Repository for Unit Testing
 * Provides in-memory data storage and manipulation
 */

export class MockMovieRepository {
  constructor(initialData = []) {
    this.movies = initialData.map((movie, index) => ({
      _id: movie._id || String(index + 1),
      ...movie
    }))
    this.callHistory = []
  }

  /**
   * Track method calls for assertion purposes
   */
  recordCall(methodName, args) {
    this.callHistory.push({ methodName, args, timestamp: Date.now() })
  }

  /**
   * Get call history for specific method
   */
  getCallHistory(methodName) {
    return this.callHistory.filter(call => call.methodName === methodName)
  }

  /**
   * Clear call history
   */
  clearCallHistory() {
    this.callHistory = []
  }

  async getAll(limit = 50) {
    this.recordCall('getAll', { limit })
    return this.movies.slice(0, limit)
  }

  async getById(id) {
    this.recordCall('getById', { id })
    const movie = this.movies.find(b => b._id === id || b._id.toString() === id)
    return movie || null
  }

  async create(movieData) {
    this.recordCall('create', { movieData })

    if (Array.isArray(movieData)) {
      throw new Error("Multiple movies not allowed")
    }

    const newMovie = {
      _id: String(Date.now()),
      ...movieData
    }
    this.movies.push(newMovie)
    
    return {
      insertedId: newMovie._id,
      acknowledged: true
    }
  }

  async update(id, updates) {
    this.recordCall('update', { id, updates })

    const movieIndex = this.movies.findIndex(b => b._id === id || b._id.toString() === id)
    
    if (movieIndex === -1) {
      return null
    }

    const allowedFields = ['title', 'author', 'status', 'rating', 'image']
    const sanitizedUpdates = {}

    allowedFields.forEach(field => {
      const value = updates[field]
      
      if (value === undefined || value === null) return

      if (typeof value === 'string') {
        const trimmed = value.trim()
        if (trimmed === '') return
        sanitizedUpdates[field] = trimmed
      } else if ((field === 'rating' || field === 'status') && !isNaN(value)) {
        sanitizedUpdates[field] = value
      }
    })

    const updatedMovie = { ...this.movies[movieIndex], ...sanitizedUpdates }
    this.movies[movieIndex] = updatedMovie
    
    return updatedMovie
  }

  async delete(id) {
    this.recordCall('delete', { id })

    const movieIndex = this.movies.findIndex(b => b._id === id || b._id.toString() === id)
    
    if (movieIndex === -1) {
      return null
    }

    const deletedMovie = this.movies[movieIndex]
    this.movies.splice(movieIndex, 1)
    
    return { value: deletedMovie }
  }

  /**
   * Reset to initial state with new data
   */
  reset(newData = []) {
    this.movies = newData.map((movie, index) => ({
      _id: movie._id || String(index + 1),
      ...movie
    }))
    this.clearCallHistory()
  }
}

// Sample test data
export const sampleMovies = [
  {
    _id: '69263e138d6f9ef025a3be7f',
    title: 'The Understory',
    author: 'James W. Tolan',
    status: 'read',
    rating: 4,
    image: 'https://example.com/understory.jpg'
  },
  {
    _id: '69263e138d6f9ef025a3be80',
    title: 'Educated',
    author: 'Tara Westover',
    status: 'reading',
    rating: 5,
    image: 'https://example.com/educated.jpg'
  },
  {
    _id: '69263e138d6f9ef025a3be81',
    title: 'Atomic Habits',
    author: 'James Clear',
    status: 'want-to-read',
    rating: 0,
    image: 'https://example.com/atomic-habits.jpg'
  }
]

export default new MockMovieRepository(sampleMovies)
