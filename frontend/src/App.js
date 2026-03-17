import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom"
//import Experience from './components/Experience'
import Home from './components/Home'
import TextGame2019 from './components/TextGame2019'
import Movie from './components/movie_page/Movie'
import MovieDetail from './components/movie_page/MovieDetail'
import { Analytics } from "@vercel/analytics/react"
import './App.css'


function App(){
  return(
    <>
    {/* This is the alias of BrowserRouter i.e. Router */}
    <Router>
        <Routes>
            {}
            <Route exact path="/" element={<Home />} />

            {}
            <Route path="/textGame2019" element={<TextGame2019 />} />

            {}
            <Route path="/movies" element={<Movie />} />

            {}
            <Route path="/movies/:id" element={<MovieDetail />} />

            {/* If any route mismatches the upper route endpoints then, redirect triggers and redirects app to home component with to="/" */}
            {/* <Redirect to="/" /> */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </Router>

    <Analytics />
    </>
  )
}

export default App
