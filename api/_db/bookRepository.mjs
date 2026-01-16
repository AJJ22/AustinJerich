import { neon } from '@neondatabase/serverless'

class BookRepository {
  /**
   * Fetch all books with optional limit
   * @param {number} limit - Maximum number of books to return
   * @returns {Promise<Array>} Array of book documents
   */
  async getAll(limit = 50) {
    const sql = neon(`${process.env.DATABASE_URL}`)
    return await sql.query(`SELECT * FROM books;`)
  }

  /**
   * Fetch a single book by ID
   * @param {string} id - integer
   * @returns {Promise<Object|null>} NeonQueryPromise or null if not found
   */
  async getById(id) {
    const sql = neon(`${process.env.DATABASE_URL}`)
    return await sql.query(`SELECT * FROM books WHERE id = ${id};`)
  }

  /**
   * Create a new book
   * @param {Object} b - Book data object
   * @returns {Promise<Object>} Result with insertedId and acknowledged status
   */
  async create(b) {
    const sql = neon(`${process.env.DATABASE_URL}`)
    return await sql.query(`INSERT INTO books (title, author, status, rating, image) VALUES
                          ('${b.title}', '${b.author}', ${b.status}, ${b.rating}, '${b.image}');`)
  }

  /**
   * Update an existing book
   * @param {string} id - integer
   * @param {Object} updates - Fields to update (title, author, status, rating, image)
   * @returns {Promise<Object|null>} NeonQueryPromise or null if not found
   */
  async update(id, updates) {
    const sql = neon(`${process.env.DATABASE_URL}`)
    const allowedFields = ['title', 'author', 'status', 'rating', 'image']

    const sanitizedUpdates = allowedFields
  .map(field => {
    const value = updates[field]
    
    if (value === undefined || value === null) return null

    if (typeof value === 'string') {
      const trimmed = value.trim()
      if (trimmed === '') return null
      return `${field} = '${trimmed}'`
    }
    else if ((field === 'rating' || field === 'status') && !isNaN(value)) {
      return `${field} = ${value}`
    }
    
    return null
  }).filter(Boolean).join(', ')

    return await sql.query(`UPDATE books SET ${sanitizedUpdates} WHERE id = ${id};`)
  }

  /**
   * Delete a book by ID
   * @param {string} id - integer
   * @returns {Promise<Object>} Deletion result
   */
  async delete(id) {
    const sql = neon(`${process.env.DATABASE_URL}`)
    return await sql.query(`DELETE FROM books WHERE id = ${id}`)
  }
}

export default new BookRepository()
