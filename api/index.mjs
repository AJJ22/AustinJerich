import express from "express"
import cors from "cors"
import "./loadEnvironment.mjs"
import books from "./routes/books.mjs"

const app = express()

app.use(express.json()) // Add this line to parse JSON bodies

// allow requests from your React dev server (or all origins during development)
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*' // set CORS_ORIGIN in .env for production
}))

app.use("/books", books)

// Global error handling
app.use((err, _req, res, next) => {
  console.error(err)
  res.status(500).send("UNEXPECTED ERROR! WHOOPS!")
})

// Development server only
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`)
  })
}

export default app