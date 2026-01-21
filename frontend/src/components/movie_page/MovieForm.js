import { useState } from 'react'
import { addMovie } from '../../client-service'
import useValidations from '../../utils/validations'
import { useDispatch } from 'react-redux'
import { addError, clearErrors } from '../../utils/errorState'
import Dropdown from '../Dropdown'
import { StarRating } from 'react-flexible-star-rating' 


export default function MovieForm({ onAdded }) {
  const [title, setTitle] = useState('')
  const [director, setDirector] = useState('')
  const [status, setStatus] = useState('')
  const [rating, setRating] = useState(0)
  const [image, setImage] = useState('')
  const { validateAdd } = useValidations()
  const Dispatch = useDispatch()

  async function submit(e) {
    e.preventDefault()
    Dispatch(clearErrors())

    if(!await validateAdd(title, director, status, rating, image)) return
    
    try {
      await addMovie({ title, director, status, rating, image })
      setTitle('')
      setDirector('')
      setStatus('')
      setRating(0)
      setImage('')
      
      if (onAdded) onAdded()
    }
    catch (err) {
      console.error(err)
      Dispatch(addError('Failed to add movie'))
    }
  }

  const changeRating = (rating) => {
    setRating(rating)
  }

  return (
    <form onSubmit={submit} className='flex my-6'>
      <input value={title} className='input-field' onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <input value={director} className='input-field' onChange={e => setDirector(e.target.value)} placeholder="director" required />
      
      <Dropdown
        value={status}
        updateStatus={(updatedStatus) => {
          setStatus(updatedStatus)
        }}
        required={true}
      />

      <div className='flex-shrink-0'>
        <StarRating
          onRatingChange={changeRating}
          isHalfRatingEnabled={true}
          dimension={19}
          color='#c5a90dff'
        />
      </div>
      
      <input value={image} className='input-field' onChange={e => setImage(e.target.value)} placeholder="Image" required />
      <button type="submit" className='btn-primary'>Add</button>
    </form>
  )
}