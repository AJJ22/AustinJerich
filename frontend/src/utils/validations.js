import { IMAGE_LINK_REQUIRED, RATING_REQUIRED, NO_SPECIAL_CHARS, AT_LEAST_ONE_FIELD_REQUIRED, FIELDS_CANNOT_BE_BLANK, NON_NEGATIVE_MULTIPLE_OF_TEN_REQUIRED } from '../constants/errorStrings'
import { addError } from './errorState'
import { useDispatch } from 'react-redux'
import axios from 'axios'


const containsSpecialCharacters = (str) => {
    const RGEX = /^[ a-zA-Z0-9 ]*$/
    return !RGEX.test(str)
}

const validateRating = (input) => {
    const n = Number(input)
    return Number.isNaN(n) || n < .5 || n > 5 || n % .5 !== 0
}

const isNonNegativeMultipleOfTen = (input) => {
    const n = Number(input)
    if(!Number.isNaN(n)){
        return false
    }
    if(n < 0 || n % 10 != 0){
        return false
    }
    return true
}

const notValidImageLink = async (link) => {
    try{
        const allowedContentTypes = ['image/jpeg', 'image/png']
        const response = await axios.get(link)
        
        //i have only ever seen 1 image/png. but i assume i will run into other image types, 
        // add them to this array to allow list them
        return !allowedContentTypes.includes(response.headers['content-type'])
    }
    catch(e){
        console.log(e)
        return true
    }
}

export default function useValidations() {
    const dispatch = useDispatch()

    const validateAdd = async (title, director, status, rating, image, genre, comment) => {
        let inputsValid = true

        if(containsSpecialCharacters(title) || containsSpecialCharacters(director) || containsSpecialCharacters(comment)){
            dispatch(addError(NO_SPECIAL_CHARS))
            inputsValid = false
        }

        if(isNonNegativeMultipleOfTen(status) || isNonNegativeMultipleOfTen(genre)){
            dispatch(addError(NON_NEGATIVE_MULTIPLE_OF_TEN_REQUIRED))
            inputsValid = false
        }

        if(validateRating(rating)){
            dispatch(addError(RATING_REQUIRED))
            inputsValid = false
        }
        if(await notValidImageLink(image)){
            dispatch(addError(IMAGE_LINK_REQUIRED))
            inputsValid = false
        }
        if(title === '' || director === '' || status === ''){
            dispatch(addError(FIELDS_CANNOT_BE_BLANK))
            inputsValid = false
        }

        return inputsValid
    }

    const validateUpdate = async (title, director, status, rating, image, genre, comment) => {
        let inputsValid = true

        if(title === '' && director === '' && status === '' && rating === '' && image === '' && genre === '' && comment === ''){
            dispatch(addError(AT_LEAST_ONE_FIELD_REQUIRED))
            return false
        }

        if(title !== undefined && title !== '' && containsSpecialCharacters(title)){
            dispatch(addError(NO_SPECIAL_CHARS))
            inputsValid = false
        }
        if(director !== undefined && director !== '' && containsSpecialCharacters(director)){
            dispatch(addError(NO_SPECIAL_CHARS))
            inputsValid = false
        }
        if(status !== undefined && status !== '' && isNonNegativeMultipleOfTen(status)){
            dispatch(addError(NON_NEGATIVE_MULTIPLE_OF_TEN_REQUIRED))
            inputsValid = false
        }
        if(genre !== undefined && genre !== '' && isNonNegativeMultipleOfTen(genre)){
            dispatch(addError(NON_NEGATIVE_MULTIPLE_OF_TEN_REQUIRED))
            inputsValid = false
        }
        if(rating !== null && rating !== '' && validateRating(rating)){
            dispatch(addError(ONLY_DECIMAL))
            inputsValid = false
        }
        if(image !== undefined && image !== '' && await notValidImageLink(image)){
            dispatch(addError(IMAGE_LINK_REQUIRED))
            inputsValid = false
        }
        if(comment !== undefined && comment !== '' && containsSpecialCharacters(comment)){
            dispatch(addError(NO_SPECIAL_CHARS))
            inputsValid = false
        }

        return inputsValid
    }

    return { validateAdd, validateUpdate }
}