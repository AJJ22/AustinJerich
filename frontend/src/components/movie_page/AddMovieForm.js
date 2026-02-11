import { useState } from 'react'
import { addMovie } from '../../client-service.js'
import useValidations from '../../utils/validations.js'
import { useDispatch } from 'react-redux'
import { addError, clearErrors } from '../../utils/errorState.js'
import Dropdown from '../Dropdown.js'
import { StarRating } from 'react-flexible-star-rating'
import { statusDescription, genreDescription } from '../../constants/DropdownItems.js'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'

export default function AddMovieForm({ onSaved, setShowAddNewForm }) {
  const [title, setTitle] = useState('')
  const [director, setDirector] = useState('')
  const [status, setStatus] = useState('')
  const [rating, setRating] = useState(0)
  const [image, setImage] = useState('')
  const [genre, setGenre] = useState('')
  const [comment, setComment] = useState('')
  const { validateAdd } = useValidations()
  const Dispatch = useDispatch()

  async function submit(e) {
    e.preventDefault()
    Dispatch(clearErrors())

    if(!await validateAdd(title, director, status, rating, image, genre, comment)) return
    
    try {
      await addMovie({ title, director, status, rating, image, genre, comment })
      setTitle('')
      setDirector('')
      setStatus('')
      setRating(0)
      setImage('')
      setGenre('')
      setComment('')
      
      if (onSaved) onSaved()
    }
    catch (err) {
      console.error(err)
      Dispatch(addError('Failed to add movie'))
    }
  }

  function cancel(e){
    e.preventDefault()
    Dispatch(clearErrors())
    setShowAddNewForm(false)
  }

  const changeRating = (rating) => {
    setRating(rating)
  }

  return (
    <form onSubmit={submit} className='pop-up-box'>
      <div className='card-title'>Add New Movie</div>
      <div className='flex'>
        <div>
          {/*<TextField label="Title" value={title} className='input-field' onChange={e => setTitle(e.target.value)}  required />*/}

          <Box
            sx={{ '& .MuiTextField-root': { m: 2, width: '25ch' } }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                label="Title"
                value={title}
                className='input-field'
                onChange={e => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <TextField
                label="Director"
                value={director}
                className='input-field'
                onChange={e => setDirector(e.target.value)}
                required
              />
            </div>
            <div>
              <TextField
                label="Image"
                value={image}
                className='input-field'
                onChange={e => setImage(e.target.value)}
                required
              />
            </div>
          </Box>
          
          <Dropdown
            lable='Status'
            value={status}
            updateFieldValue={(updatedStatus) => {
              setStatus(updatedStatus)
            }}
            required={true}
            dropdownItems={statusDescription}
          />
        </div>
        
        {/*<TextField label="Director" value={director} className='input-field' onChange={e => setDirector(e.target.value)} required />*/}

        {/*<TextField label="Image" value={image} className='input-field' onChange={e => setImage(e.target.value)} required />*/}
        
        <div>
          <Dropdown
            lable='Genre'
            value={genre}
            updateFieldValue={(updatedGenre) => {
              setGenre(updatedGenre)
            }}
            required={true}
            dropdownItems={genreDescription}
          />

          <div className='flex-shrink-0 mx-4'>
            <label htmlFor="rating">Rating</label>
            <StarRating
              id='rating'
              onRatingChange={changeRating}
              isHalfRatingEnabled={true}
              dimension={12}
              color='#c5a90dff'
            />
          </div>

          <div className='flex flex-col mx-4 my-7'>
            <label htmlFor='comment'>Comments</label>
            <textarea id='comment' value={comment} className='input-field' rows='4' cols='30' onChange={e => setComment(e.target.value)} placeholder='Comments...'/>
          </div>
        </div>
      </div>

      <div className="flex">
        <button type="submit" className='btn-primary'>Add</button>
        <button className='btn-primary' onClick={cancel}>Cancel</button>
      </div>
    </form>
  )
}