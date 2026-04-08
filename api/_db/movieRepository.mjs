import { neon } from '@neondatabase/serverless'
import { buildWhereClause } from './repoHelperFunctions.mjs'

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
   * @param {Object} queryParams - params to filter with
   * @returns {Promise<Array>} Array of movies
   */
  async getAllWithFilters(queryParams) {
    const sql = neon(`${process.env.DATABASE_URL}`)
    const whereClause = buildWhereClause(queryParams)

    console.log(`SELECT * FROM movies WHERE ${whereClause};`)

    return await sql.query(`SELECT * FROM movies WHERE ${whereClause};`)
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
   * @param {Object} m - Movie data object
   * @returns {Promise<Object>} Result with insertedId and acknowledged status
   */
  async create(m) {
    const sql = neon(`${process.env.DATABASE_URL}`)
    return await sql.query(`INSERT INTO movies (title, director, status, rating, image, genre, comment) VALUES
                          ('${m.title}', '${m.director}', '${m.status}', ${m.rating}, '${m.image}', '${m.genre}', '${m.comment}');`)
  }

  /**
   * Update an existing movie
   * @param {string} id - integer
   * @param {Object} updates - Fields to update (title, director, status, rating, image)
   * @returns {Promise<Object|null>} NeonQueryPromise or null if not found
   */
  async update(id, updates) {
    const sql = neon(`${process.env.DATABASE_URL}`)
    const allowedFields = ['title', 'director', 'status', 'rating', 'image', 'genre', 'comment']

    const sanitizedUpdates = allowedFields
    .map(field => {
      const value = updates[field]
      
      if (value === undefined || value === null) return null

      if (typeof value === 'string') {
        const trimmed = value.trim()
        if (trimmed === '') return null
        return `${field} = '${trimmed}'`
      }
      else if ((field === 'rating' || field === 'status' || field === 'genre') && !isNaN(value)) {
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
