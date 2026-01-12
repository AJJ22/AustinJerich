/**
 * Mock Book Repository for Unit Testing
 * Provides in-memory data storage and manipulation
 */

export class MockBookRepository {
  constructor(initialData = []) {
    this.books = initialData.map((book, index) => ({
      _id: book._id || String(index + 1),
      ...book
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
    return this.books.slice(0, limit)
  }

  async getById(id) {
    this.recordCall('getById', { id })
    const book = this.books.find(b => b._id === id || b._id.toString() === id)
    return book || null
  }

  async create(bookData) {
    this.recordCall('create', { bookData })

    if (Array.isArray(bookData)) {
      throw new Error("Multiple books not allowed")
    }

    const newBook = {
      _id: String(Date.now()),
      ...bookData
    }
    this.books.push(newBook)
    
    return {
      insertedId: newBook._id,
      acknowledged: true
    }
  }

  async update(id, updates) {
    this.recordCall('update', { id, updates })

    const bookIndex = this.books.findIndex(b => b._id === id || b._id.toString() === id)
    
    if (bookIndex === -1) {
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

    const updatedBook = { ...this.books[bookIndex], ...sanitizedUpdates }
    this.books[bookIndex] = updatedBook
    
    return updatedBook
  }

  async delete(id) {
    this.recordCall('delete', { id })

    const bookIndex = this.books.findIndex(b => b._id === id || b._id.toString() === id)
    
    if (bookIndex === -1) {
      return null
    }

    const deletedBook = this.books[bookIndex]
    this.books.splice(bookIndex, 1)
    
    return { value: deletedBook }
  }

  /**
   * Reset to initial state with new data
   */
  reset(newData = []) {
    this.books = newData.map((book, index) => ({
      _id: book._id || String(index + 1),
      ...book
    }))
    this.clearCallHistory()
  }
}

// Sample test data
export const sampleBooks = [
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

export default new MockBookRepository(sampleBooks)
