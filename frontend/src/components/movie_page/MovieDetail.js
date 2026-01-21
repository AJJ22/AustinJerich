import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getMovie } from '../../client-service.js'
import ErrorDisplay from './ErrorDisplay.js'
import UpdateMovie from './UpdateMovie.js'
import NavBar from '../NavBar.js'
import { useDispatch } from 'react-redux'
import { clearErrors } from '../../utils/errorState.js'
import { StarRating } from 'react-flexible-star-rating'

export default function MovieDetail() {
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const Dispatch = useDispatch()
  const statusDescription = {
    10: 'Completed',
    20: 'Reading',
    30: 'Not Started'
  }

  useEffect(() => {
    let mounted = true
    getMovie(id)
      .then(data => { if (mounted) setMovie(data[0]) })
      .catch(err => console.error(err))
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [id])

  if (loading) return <div>Loading movie...</div>
  if (!movie) return <div>Movie not found</div>

  return (
    <div>
      <NavBar />

      <div className="page-tailwind flex flex-row">
        <div>
          <button onClick={() => {
              navigate('/movies')
              Dispatch(clearErrors())
            }}
            className='btn-primary'>
            ← Back to Movies
          </button>
              
          <div className='text-4xl p-6 font-[900] tracking-widest'>{movie.title}</div>
          <div className='flex'>
            <div className='p-4'>
              <img src={movie.image} alt={movie.title} className='max-w-[300px]' />
            </div>
            <div className='movie-details-0'>
              <div className='movie-details-1'>
                <div className='movie-details-2'>Director:</div>
                <div className='movie-details-3'>{movie.director}</div>
              </div>
              <div className='movie-details-1'>
                <div className='movie-details-2'>Status:</div>
                <div className='movie-details-3'>{statusDescription[movie.status]}</div>
              </div>
              <div className='movie-details-1'>
                <div className='movie-details-2'>Rating:</div>
                <div className='flex-shrink-0 mx-3'>
                  <StarRating
                    key={Number(movie.rating)}
                    isReadOnly={true}
                    isHalfRatingEnabled={true}
                    initialRating={movie.rating}
                    dimension={10}
                    color='#c5a90dff'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          {!showUpdateForm && (
            <button onClick={() => {
                setShowUpdateForm(showUpdateForm => !showUpdateForm)
                Dispatch(clearErrors())
              }}
              className='btn-primary max-w-[200px]'>
              Update
            </button>
          )}

          {showUpdateForm && (
            <UpdateMovie
              onSaved={(updatedMovie) => {
                setMovie(updatedMovie)
                setShowUpdateForm(false)
              }}
              changeShowUpdateForm={setShowUpdateForm}
            />
          )}
        </div>

        <ErrorDisplay />
      </div>
    </div>
  )
}