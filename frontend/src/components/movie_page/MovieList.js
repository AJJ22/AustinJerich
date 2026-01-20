import { useEffect, useState } from 'react'
import { getMovies, deleteMovie } from '../../client-service'
import { useNavigate } from 'react-router-dom'
import { clearErrors } from '../../utils/errorState'
import { useDispatch } from 'react-redux'

export default function MovieList({ onRefresh }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
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
        .map(b => (
          <div className='movie-card-tailwind' key={b._id || b.id}>
            <img
              src={b.image}
              alt='movie cover'
              onClick={() => {
                navigate(`/movies/${b._id || b.id}`)
                Dispatch(clearErrors())
              }}
              className='max-w-[200px] mx-auto cursor-pointer'
            />
            <button className='btn-primary' onClick={async () => { await deleteMovie(b._id || b.id); setMovies(bs => bs.filter(x => (x._id || x.id) !== (b._id || b.id))) }}>Delete</button>
          </div>
        ))
      }
    </div>
  )
}



    