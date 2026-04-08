import { useEffect, useState } from 'react'
import { getMovies } from '../../client-service'
import { useNavigate } from 'react-router-dom'
import { clearErrors } from '../../utils/errorState'
import { useDispatch } from 'react-redux'

export default function MovieList({ onRefresh, movies, setMovies, loading, setLoading }) {
  const navigate = useNavigate()
  const Dispatch = useDispatch()

  useEffect(() => {
    let mounted = true
    getMovies().then(data => { if (mounted) setMovies(data) }).catch(() => {}).finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [onRefresh])

  if (loading) return <div>Loading movies...</div>


  return (
    <div className='movie-container-tailwind'>
      {movies
        .sort((a, b) => a.id - b.id)
        .map(movie => (
          <div className='movie-card-tailwind' key={movie._id || movie.id}>
            <img
              src={movie.image}
              alt='Movie cover'
              onClick={() => {
                navigate(`/movies/${movie._id || movie.id}`)
                Dispatch(clearErrors())
              }}
              className='max-w-[200px] mx-auto cursor-pointer'
            />
          </div>
        ))
      }
    </div>
  )
}