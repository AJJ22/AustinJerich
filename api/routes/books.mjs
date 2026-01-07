import express from "express"
import bookRepository from "../db/bookRepository.mjs"
import { ObjectId } from "mongodb"

export function createRouter(repository = bookRepository) {
  const router = express.Router()

  //get all books
  router.get('/', async (req, res) => {
    try{
      const results = await repository.getAll(50)
      return res.status(200).json(results)
    }
    catch(e){
      console.log(e)
      return res.status(500).json({ message: e.message || String(e) })
    }
  })

  //get a book by id
  router.get('/:id', async (req, res) => {
    try{
      if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "invalid id" })
      }

      const result = await repository.getById(req.params.id)

      if(!result){
        return res.status(404).json({ message: "book not found" })
      }
      return res.status(200).json(result)
    }
    catch(e){
      console.log(e)
      return res.status(500).json({message: e.message || String(e)})
    }
  })

  //add a new book
  router.post('/', async (req, res) => {
    try{
      if(Array.isArray(req.body)){
        return res.status(400).json({ message: "array not allowed" })
      }
      const result = await repository.create(req.body)
      return res.status(200).json(result)
    }
    catch(e){
      console.log(e)
      const statusCode = e.message === "Multiple books not allowed" ? 400 : 500
      return res.status(statusCode).json({ message: e.message || String(e) })
    }
  })

  //update an existing book
  router.put("/:id", async (req, res) => {
    try{
      if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "invalid id" })
      }

      const result = await repository.update(req.params.id, req.body)

      if(!result){
        return res.status(404).json({ message: 'book not found' })
      }
      return res.status(200).json(result)
    }
    catch(e){
      console.log(e)
      const statusCode = e.message === "Invalid book ID format" ? 400 : 500
      return res.status(statusCode).json({ message: e.message || String(e) })
    }
  })

  //delete an existing book
  router.delete("/:id", async (req, res) => {    
    try{
      if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "invalid id" })
      }
      await repository.delete(req.params.id)
      return res.status(204).json({ message: "delete successful" })
    }
    catch(e){
      console.log(e)
      return res.status(500).json({ message: e.message || String(e) })
    }
  })

  return router
}

export default createRouter()