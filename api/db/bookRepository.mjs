import { ObjectId } from "mongodb"
import db from "./conn.mjs"

class BookRepository {
  /**
   * Fetch all books with optional limit
   * @param {number} limit - Maximum number of books to return
   * @returns {Promise<Array>} Array of book documents
   */
  async getAll(limit = 50) {
    const collection = db.collection("books")
    return await collection.find({}).limit(limit).toArray()
  }

  /**
   * Fetch a single book by ID
   * @param {string} id - MongoDB ObjectId as string
   * @returns {Promise<Object|null>} Book document or null if not found
   */
  async getById(id) {
    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid book ID format")
    }
    const collection = db.collection("books")
    return await collection.findOne({ _id: new ObjectId(id) })
  }

  /**
   * Create a new book
   * @param {Object} bookData - Book data object
   * @returns {Promise<Object>} Result with insertedId and acknowledged status
   */
  async create(bookData) {
    const collection = db.collection("books")
    
    if (Array.isArray(bookData)) {
      throw new Error("Multiple books not allowed")
    }
    
    return await collection.insertOne(bookData)
  }

  /**
   * Update an existing book
   * @param {string} id - MongoDB ObjectId as string
   * @param {Object} updates - Fields to update (title, author, status, rating, image)
   * @returns {Promise<Object|null>} Updated book document or null if not found
   */
  async update(id, updates) {
    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid book ID format")
    }

    const collection = db.collection("books")
    const allowedFields = ['title', 'author', 'status', 'rating', 'image']
    const sanitizedUpdates = {}

    allowedFields.forEach(field => {
      const value = updates[field]
      
      if (value === undefined || value === null) return

      if (typeof value === 'string') {
        const trimmed = value.trim()
        if (trimmed === '') return
        sanitizedUpdates[field] = trimmed
      }
      else if ((field === 'rating' || field === 'status') && !isNaN(value)) {
        sanitizedUpdates[field] = value
      }
    })

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: sanitizedUpdates },
      { returnDocument: 'after' }
    )
    
    return result
  }

  /**
   * Delete a book by ID
   * @param {string} id - MongoDB ObjectId as string
   * @returns {Promise<Object>} Deletion result
   */
  async delete(id) {
    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid book ID format")
    }

    const collection = db.collection("books")
    return await collection.findOneAndDelete({ _id: new ObjectId(id) })
  }
}

export default new BookRepository()
