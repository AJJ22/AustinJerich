import { useState } from 'react'
import { updateMovie, getMovie } from '../../client-service'
import useValidations from '../../utils/validations'
import { useDispatch } from 'react-redux'
import { addError, clearErrors } from '../../utils/errorState'
import { useParams } from 'react-router-dom'
import Dropdown from '../Dropdown'
import { StarRating } from 'react-flexible-star-rating'
import { genreDescription, statusDescription } from '../../constants/DropdownItems'

export default function UpdateMovie({ onSaved, changeShowUpdateForm }) {
  const { validateUpdate } = useValidations()
  const [title, setTitle] = useState('')
  const [director, setDirector] = useState('')
  const [status, setStatus] = useState('')
  const [rating, setRating] = useState('')
  const [image, setImage] = useState('')
  const [genre, setGenre] = useState('')
  const [comment, setComment] = useState('')
  const { id } = useParams()
  const Dispatch = useDispatch()

  async function submit(e) {
    e.preventDefault()
    Dispatch(clearErrors())

    if(!await validateUpdate(title, director, status, rating, image, genre, comment)){
      return
    }
    
    try {
        let updatedMovie = await updateMovie(id, { title, director, status, rating, image, genre, comment })
        if (!updatedMovie[0]) updatedMovie = await getMovie(id)

        if(onSaved) onSaved(updatedMovie[0])
    }
    catch (err) {
      console.error(err)
      Dispatch(addError('Failed to update movie'))
    }
  }

  const changeRating = (rating) => {
    setRating(rating)
  }

  function cancel(e){
    e.preventDefault()
    Dispatch(clearErrors())
    changeShowUpdateForm(false)
  }

  return (
    <form onSubmit={submit} className='pop-up-box-update-form'>
      <input value={title} className='input-field' onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <input value={director} className='input-field' onChange={e => setDirector(e.target.value)} placeholder="director" />
      
      <Dropdown
        lable='Status'
        value={status}
        updateFieldValue={(updatedStatus) => {
          setStatus(updatedStatus)
        }}
        required={false}
        dropdownItems={statusDescription}
      />

      <StarRating
        onRatingChange={changeRating}
        isHalfRatingEnabled={true}
        dimension={12.4}
        color='#c5a90dff'
      />

      <input value={image} className='input-field' onChange={e => setImage(e.target.value)} placeholder="Image" />
      
      <Dropdown
        lable='Genre'
        value={genre}
        updateFieldValue={(updatedGenre) => {
          setGenre(updatedGenre)
        }}
        required={false}
        dropdownItems={genreDescription}
      />

      <textarea value={comment} className='input-field' rows='4' cols='30' onChange={e => setComment(e.target.value)} placeholder='Comments...'/>
      
      <div className='flex'>
        <button type="submit" className='btn-primary'>Update</button>
        <button onClick={cancel} className='btn-primary'>Cancel</button>
      </div>
    </form>
  )
}