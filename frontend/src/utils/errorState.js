const initialState = {
  errors: [],
  lastError: null
}

export function errorReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_ERROR':
      return {
        ...state,
        errors: [...state.errors, action.payload],
        lastError: action.payload
      }

    case 'REMOVE_ERROR':
      return {
        ...state,
        errors: state.errors.filter((_, index) => index !== action.payload)
      }

    case 'CLEAR_ERRORS':
      return {
        ...state,
        errors: [],
        lastError: null
      }

    default:
      return state
  }
}

// Action creators
export const addError = (message) => ({
  type: 'ADD_ERROR',
  payload: message
})

export const removeError = (index) => ({
  type: 'REMOVE_ERROR',
  payload: index
})

export const clearErrors = () => ({
  type: 'CLEAR_ERRORS'
})