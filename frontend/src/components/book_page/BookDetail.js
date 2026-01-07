import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getBook } from '../../client-service.js'
import ErrorDisplay from './ErrorDisplay.js'
import UpdateBook from './UpdateBook.js'
import NavBar from '../NavBar.js'
import { useDispatch } from 'react-redux'
import { clearErrors } from '../../utils/errorState'
import { StarRating } from 'react-flexible-star-rating'

export default function BookDetail() {
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const Dispatch = useDispatch()
  const statusDescription = {
    10: 'Completed',
    20: 'Reading',
    30: 'Not Started'
  }

  useEffect(() => {
    let mounted = true
    getBook(id)
      .then(data => { if (mounted) setBook(data) })
      .catch(err => console.error(err))
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [id])

  if (loading) return <div>Loading book...</div>
  if (!book) return <div>Book not found</div>

  return (
    <div>
      <NavBar />

      <div className="page-tailwind flex flex-row">
        <div>
          <button onClick={() => {
              navigate('/books')
              Dispatch(clearErrors())
            }}
            className='btn-primary'>
            ← Back to Books
          </button>
              
          <div className='text-4xl p-6 font-[900] tracking-widest'>{book.title}</div>
          <div className='flex'>
            <div className='p-4'>
              <img src={book.image} alt={book.title} className='max-w-[300px]' />
            </div>
            <div className='book-details-0'>
              <div className='book-details-1'>
                <div className='book-details-2'>Author:</div>
                <div className='book-details-3'>{book.author}</div>
              </div>
              <div className='book-details-1'>
                <div className='book-details-2'>Status:</div>
                <div className='book-details-3'>{statusDescription[book.status]}</div>
              </div>
              <div className='book-details-1'>
                <div className='book-details-2'>Rating:</div>
                <div className='flex-shrink-0 mx-3'>
                  <StarRating
                    key={Number(book.rating)}
                    isReadOnly={true}
                    isHalfRatingEnabled={true}
                    initialRating={book.rating}
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
            <UpdateBook
              onSaved={(updatedBook) => {
                setBook(updatedBook)
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