import { useState } from 'react'
import NavBar from '../NavBar.js'
import MovieForm from './MovieForm.js'
import MovieList from './MovieList.js'
import ErrorDisplay from './ErrorDisplay.js'

export default function MoviesPage() {
  const [refreshKey, setRefreshKey] = useState(0)
  return (
    <div>
        <NavBar />

        <div className="page-tailwind">
            <h1 className='text-3xl font-bold'>Movies</h1>
            <ErrorDisplay />
            <MovieForm onAdded={() => setRefreshKey(k => k + 1)} />
            <MovieList onRefresh={refreshKey} />
        </div>
    </div>
  )
}