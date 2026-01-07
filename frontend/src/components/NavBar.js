import { Link, useLocation } from 'react-router-dom'

export default function NavBar() {
  const location = useLocation()
  const isActive = (path) => location.pathname === path ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex gap-8">
          <Link to="/" className={`pb-2 transition ${isActive('/')}`}>Home</Link>
          <Link to="/experience" className={`pb-2 transition ${isActive('/experience')}`}>Experience</Link>
          <Link to="/education" className={`pb-2 transition ${isActive('/education')}`}>Education</Link>
          <Link to="/contact" className={`pb-2 transition ${isActive('/contact')}`}>Contact</Link>
          <Link to="/TextGame2019" className={`pb-2 transition whitespace-nowrap ${isActive('/TextGame2019')}`}>Text Game 2019</Link>
          <Link to="/books" className={`pb-2 transition ${isActive('/books')}`}>Books</Link>
        </div>
      </div>
    </nav>
  )
}

