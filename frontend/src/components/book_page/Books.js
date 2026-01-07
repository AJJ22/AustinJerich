import { useState } from 'react'
import NavBar from '../NavBar.js'
import BookForm from './BookForm'
import BookList from './BookList'
import ErrorDisplay from './ErrorDisplay.js'

export default function BooksPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  return (
    <div>
        <NavBar />

        <div className="page-tailwind">
            <h1 className='text-3xl font-bold'>Books</h1>
            <ErrorDisplay />
            <BookForm onAdded={() => setRefreshKey(k => k + 1)} />
            <BookList onRefresh={refreshKey} />
        </div>
    </div>
  )
}