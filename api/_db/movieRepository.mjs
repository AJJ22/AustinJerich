import { neon } from '@neondatabase/serverless'

class MovieRepository {
  /**
   * Fetch all movies with optional limit
   * @param {number} limit - Maximum number of movies to return
   * @returns {Promise<Array>} Array of movie documents
   */
  async getAll(limit = 50) {
    const sql = neon(`${process.env.DATABASE_URL}`)
    return await sql.query(`SELECT * FROM movies;`)
  }

  /**
   * Fetch a single movie by ID
   * @param {string} id - integer
   * @returns {Promise<Object|null>} NeonQueryPromise or null if not found
   */
  async getById(id) {
    const sql = neon(`${process.env.DATABASE_URL}`)
    return await sql.query(`SELECT * FROM movies WHERE id = ${id};`)
  }

  /**
   * Create a new movie
   * @param {Object} b - Movie data object
   * @returns {Promise<Object>} Result with insertedId and acknowledged status
   */
  async create(b) {
    const sql = neon(`${process.env.DATABASE_URL}`)
    return await sql.query(`INSERT INTO movies (title, director, status, rating, image) VALUES
                          ('${b.title}', '${b.director}', ${b.status}, ${b.rating}, '${b.image}');`)
  }

  /**
   * Update an existing movie
   * @param {string} id - integer
   * @param {Object} updates - Fields to update (title, director, status, rating, image)
   * @returns {Promise<Object|null>} NeonQueryPromise or null if not found
   */
  async update(id, updates) {
    const sql = neon(`${process.env.DATABASE_URL}`)
    const allowedFields = ['title', 'director', 'status', 'rating', 'image']

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

    return await sql.query(`UPDATE movies SET ${sanitizedUpdates} WHERE id = ${id};`)
  }

  /**
   * Delete a movie by ID
   * @param {string} id - integer
   * @returns {Promise<Object>} Deletion result
   */
  async delete(id) {
    const sql = neon(`${process.env.DATABASE_URL}`)
    return await sql.query(`DELETE FROM movies WHERE id = ${id}`)
  }
}

export default new MovieRepository()
