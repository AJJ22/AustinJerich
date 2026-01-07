import { useEffect, useState } from 'react'
import { getBooks, deleteBook } from '../../client-service'
import { useNavigate } from 'react-router-dom'
import { clearErrors } from '../../utils/errorState'
import { useDispatch } from 'react-redux'

export default function BookList({ onRefresh }) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const Dispatch = useDispatch()

  useEffect(() => {
    let mounted = true
    getBooks().then(data => { if (mounted) setBooks(data) }).catch(() => {}).finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [onRefresh])

  if (loading) return <div>Loading books...</div>



  return (
    <div className='book-container-tailwind'>
      {books.map(b => (
        <div className='book-card-tailwind' key={b._id || b.id}>
          <img
            src={b.image}
            alt='book cover'
            onClick={() => {
              navigate(`/books/${b._id || b.id}`)
              Dispatch(clearErrors())
            }}
            className='max-w-[200px] mx-auto cursor-pointer'
          />
          <button className='btn-primary' onClick={async () => { await deleteBook(b._id || b.id); setBooks(bs => bs.filter(x => (x._id || x.id) !== (b._id || b.id))) }}>Delete</button>
        </div>
      ))}
    </div>
  )
}



    