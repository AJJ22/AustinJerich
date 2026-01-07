import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Education from './components/Education'
import Experience from './components/Experience'
import Home from './components/Home'
import Contact from './components/Contact'
import TextGame2019 from './components/TextGame2019'
import Books from './components/book_page/Books'
import BookDetail from './components/book_page/BookDetail'
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
            <Route path="/experience" element={<Experience />} />

            {}
            <Route path="/education" element={<Education />} />

            {}
            <Route path="/contact" element={<Contact />} />

            {}
            <Route path="/textGame2019" element={<TextGame2019 />} />

            {}
            <Route path="/books" element={<Books />} />

            {}
            <Route path="/books/:id" element={<BookDetail />} />

            {/* If any route mismatches the upper route endpoints then, redirect triggers and redirects app to home component with to="/" */}
            {/* <Redirect to="/" /> */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </Router>
</>
  )
}

export default App
