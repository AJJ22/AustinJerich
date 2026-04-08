import { useState } from 'react'
import { Navigation } from '../navigation.js'
import AddMovieForm from './AddMovieForm.js'
import MovieList from './MovieList.js'
import ErrorDisplay from './ErrorDisplay.js'
import { useDispatch } from 'react-redux'
import { clearErrors } from '../../utils/errorState.js'
import Filter from './Filter.js'

export default function MoviesPage() {
  const [showAddNewForm, setShowAddNewForm] = useState(false)
  const [showFilterForm, setShowFilterForm] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const Dispatch = useDispatch()

  return (
    <div className={`${showAddNewForm ? 'overlay' : ''}`}>
        <Navigation />
        
        <div className="page-tailwind">
            <div className='flex items-center justify-between'>
              <h1 className='header'>Movies</h1>
              
              <div className='flex w-full justify-end'>
                {!showAddNewForm && (
                  <button onClick={() => {
                      setShowAddNewForm(showAddNewForm => !showAddNewForm)
                      Dispatch(clearErrors())
                    }}
                    className='btn-primary max-w-[200px]'>
                    New Movie
                  </button>
                )}

                {!showFilterForm && (
                  <button onClick={() => {
                      setShowFilterForm(showFilterForm => !showFilterForm)
                    }}
                    className='btn-primary max-w-[200px]'>
                    Filter
                  </button>
                )}
              </div>
            </div>

            <ErrorDisplay />

            <div className={`${showAddNewForm ? 'flex absolute justify-center h-screen w-screen' : ''}`}>
              {showAddNewForm && (
                <AddMovieForm
                  onSaved={() => {
                    setRefreshKey(k => k + 1)
                    setShowAddNewForm(false)
                  }}
                  setShowAddNewForm={setShowAddNewForm}
                />
              )}
            </div>

            <div>
              {showFilterForm && (
                <Filter
                  onRefresh={refreshKey}
                  movies={movies}
                  setMovies={setMovies}
                  loading={loading}
                  setLoading={setLoading}
                  setShowFilterForm={setShowFilterForm}
                />
              )}
            </div>
            
            <div className='mt-10'>
              <MovieList
                onRefresh={refreshKey}
                movies={movies}
                setMovies={setMovies}
                loading={loading}
                setLoading={setLoading}
              />
            </div>
        </div>
    </div>
  )
}