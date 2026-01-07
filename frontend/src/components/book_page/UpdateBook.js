import { useState } from 'react'
import { updateBook, getBook } from '../../client-service'
import useValidations from '../../utils/validations'
import { useDispatch } from 'react-redux'
import { addError, clearErrors } from '../../utils/errorState'
import { useParams } from 'react-router-dom'
import Dropdown from '../Dropdown'
import { StarRating } from 'react-flexible-star-rating'

export default function UpdateBook({ onSaved, changeShowUpdateForm }) {
  const { validateUpdate } = useValidations()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [status, setStatus] = useState('')
  const [rating, setRating] = useState('')
  const [image, setImage] = useState('')
  const { id } = useParams()
  const Dispatch = useDispatch()

  async function submit(e) {
    e.preventDefault()
    Dispatch(clearErrors())

    if(!await validateUpdate(title, author, status, rating, image)){
      return
    }
    
    try {
        let updatedBook = await updateBook(id, { title, author, status, rating, image })
        if (!updatedBook) updatedBook = await getBook(id)

        if(onSaved) onSaved(updatedBook)
    }
    catch (err) {
      console.error(err)
      Dispatch(addError('Failed to update book'))
    }
  }

  const changeRating = (rating) => {
    setRating(rating)
  }

  function cancel(e){
    e.preventDefault()
    changeShowUpdateForm(false)
  }

  return (
    <form onSubmit={submit} className='flex flex-col'>
      <input value={title} className='input-field' onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <input value={author} className='input-field' onChange={e => setAuthor(e.target.value)} placeholder="Author" />
      
      <Dropdown
        value={status}
        updateStatus={(updatedStatus) => {
          setStatus(updatedStatus)
        }}
        required={false}
      />

      <StarRating
        onRatingChange={changeRating}
        isHalfRatingEnabled={true}
        dimension={12.4}
        color='#c5a90dff'
      />

      <input value={image} className='input-field' onChange={e => setImage(e.target.value)} placeholder="Image" />
      <div className='flex'>
        <button type="submit" className='btn-primary'>Update</button>
        <button onClick={cancel} className='btn-primary'>Cancel</button>
      </div>
    </form>
  )
}