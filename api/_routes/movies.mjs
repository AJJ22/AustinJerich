import express from "express"
import movieRepository from "../_db/movieRepository.mjs"

// TODO: fix possible sql injection

function createRouter(repository = movieRepository) {
  const router = express.Router()

  //get all movies
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

  //get a movie by id
  router.get('/:id', async (req, res) => {
    try{
      if (!typeof(req.params.id) == 'number') {
        return res.status(400).json({ message: "invalid id" })
      }
      
      const result = await repository.getById(req.params.id)
      
      if(!result){
        return res.status(404).json({ message: "movie not found" })
      }
      return res.status(200).json(result)
    }
    catch(e){
      console.log(e)
      return res.status(500).json({message: e.message || String(e)})
    }
  })

  //add a new movie
  router.post('/', async (req, res) => {
    try{
      if(Array.isArray(req.body)){
        return res.status(400).json({ message: "array not allowed" })
      }
      const result = await repository.create(req.body)
      return res.status(201).json(result)
    }
    catch(e){
      console.log(e)
      const statusCode = e.message === "Multiple movies not allowed" ? 400 : 500
      return res.status(statusCode).json({ message: e.message || String(e) })
    }
  })

  //update an existing movie
  router.put("/:id", async (req, res) => {
    try{
      if (!typeof(req.params.id) == 'number') {
        return res.status(400).json({ message: "invalid id" })
      }

      const result = await repository.update(req.params.id, req.body)

      if(!result){
        return res.status(404).json({ message: 'movie not found' })
      }
      return res.status(200).json(result)
    }
    catch(e){
      console.log(e)
      const statusCode = e.message === "Invalid movie ID format" ? 400 : 500
      return res.status(statusCode).json({ message: e.message || String(e) })
    }
  })

  //delete an existing movie
  router.delete("/:id", async (req, res) => {
    try{
      if (!typeof(req.params.id) == 'number') {
        return res.status(400).json({ message: "invalid id" })
      }
      await repository.delete(req.params.id)
      return res.status(204).send()
    }
    catch(e){
      console.log(e)
      return res.status(500).json({ message: e.message || String(e) })
    }
  })

  return router
}

export { createRouter }
export default createRouter()