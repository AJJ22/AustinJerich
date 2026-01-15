import express from "express"
import cors from "cors"
import "./_loadEnvironment.mjs"
import createRouter from "./_routes/books.mjs"

const app = express()

app.use(express.json())

// Log all incoming requests
app.use((req, res, next) => {
  try{
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
    next()
  }
  catch(e){
    console.error('Error in handler: ', e)
    res.status(500).json({ error: e.message })
  }
})

// allow requests from your React dev server (or all origins during development)
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*' // set CORS_ORIGIN in .env for production
}))

const API_PATH = process.env.VERCEL ? '/api/books' : '/books'
app.use(API_PATH, createRouter)

// Global error handling
app.use((err, _req, res, next) => {
  console.error(err)
  res.status(500).send("UNEXPECTED ERROR! WHOOPS!")
})

// Development server only
if (!process.env.VERCEL) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`)
  })
}

export default app