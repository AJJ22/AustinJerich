import { useSelector, useDispatch } from 'react-redux'
import { removeError } from '../../utils/errorState'

export default function ErrorDisplay() {
  const errors = useSelector(state => state.errors.errors)
  const dispatch = useDispatch()

  return (
    <div>
      {errors.map((error, index) => (
        <div key={index} className='text-red-600 mx-5'>
          {error}
          <button className='btn-secondary mx-3' onClick={() => dispatch(removeError(index))}>X</button>
        </div>
      ))}
    </div>
  )
}