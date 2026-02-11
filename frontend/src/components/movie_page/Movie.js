import { useState } from 'react'
import NavBar from '../NavBar.js'
import AddMovieForm from './AddMovieForm.js'
import MovieList from './MovieList.js'
import ErrorDisplay from './ErrorDisplay.js'
import { useDispatch } from 'react-redux'
import { addError, clearErrors } from '../../utils/errorState.js'

export default function MoviesPage() {
  const [showAddNewForm, setShowAddNewForm] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const Dispatch = useDispatch()

  return (
    <div className={`${showAddNewForm ? 'overlay' : ''}`}>
        <NavBar />

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
            
            <div className='mt-10'>
              <MovieList onRefresh={refreshKey} />
            </div>
        </div>
    </div>
  )
}