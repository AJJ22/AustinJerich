import { statusDescription, genreDescription } from '../../constants/DropdownItems.js'
import { StarRating } from 'react-flexible-star-rating'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Dropdown from '../Dropdown.js'
import { useState } from 'react'
import { filterMovieList } from '../../client-service'


export default function Filter({ setMovies, setShowFilterForm }) {
  const [title, setTitle] = useState('')
  const [director, setDirector] = useState('')
  const [status, setStatus] = useState('')
  const [rating, setRating] = useState(0)
  const [genre, setGenre] = useState('')

  async function updateMovieList(e){
    e.preventDefault()

    const columns = ['title', 'director', 'status', 'rating', 'genre']
    const values = [title, director, status, rating, genre]
    let filters = ''
    let isFirst = true

    values.forEach((value, index) => {
      if((value !== '' && typeof value === 'string') || (value > 0 && typeof value === "number")){
        if(!isFirst) filters += '&'
        filters += `${columns[index]}=${value}`
        isFirst = false
      }
    })

    const filteredMovieList = await filterMovieList(filters)

    setMovies(filteredMovieList)
  }

  function cancel(e){
    e.preventDefault()
    setShowFilterForm(false)
  }

  function changeRating(rating){
    setRating(rating)
  }

  return(
    <form onSubmit={updateMovieList} className='filter-box'>
      <Box
        sx={{ '& .MuiTextField-root': { m: 2, width: '25ch' } }}
        noValidate
        autoComplete="off"
        className='flex'
      >
        <div>
          <TextField
            label="Title"
            value={title}
            className='input-field'
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div>
          <TextField
            label="Director"
            value={director}
            className='input-field'
            onChange={e => setDirector(e.target.value)}
          />
        </div>
      </Box>

      <Dropdown
        lable='Status'
        value={status}
        updateFieldValue={(updatedStatus) => {
          setStatus(updatedStatus)
        }}
        dropdownItems={statusDescription}
      />

      <Dropdown
        lable='Genre'
        value={genre}
        updateFieldValue={(updatedGenre) => {
          setGenre(updatedGenre)
        }}
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

      <div className="flex h-fit">
        <button type="submit" className='btn-primary'>Filter</button>
        <button className='btn-primary' onClick={cancel}>Cancel</button>
      </div>
    </form>
  )
}



