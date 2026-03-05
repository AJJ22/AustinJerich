import { IMAGE_LINK_REQUIRED, RATING_REQUIRED, NO_SPECIAL_CHARS, AT_LEAST_ONE_FIELD_REQUIRED, FIELDS_CANNOT_BE_BLANK, INVALID_DROPDOWN_SELECTION } from '../constants/errorStrings'
import { genreDescription, statusDescription } from '../constants/DropdownItems'
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

const isNotValidDropdownItem = (input, list) => {
    if(!list.includes(input)){
        return true
    }
    return false
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

        if(isNotValidDropdownItem(status, statusDescription) || isNotValidDropdownItem(genre, genreDescription)){
            dispatch(addError(INVALID_DROPDOWN_SELECTION))
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
        if(status !== undefined && status !== '' && isNotValidDropdownItem(status, statusDescription)){
            dispatch(addError(INVALID_DROPDOWN_SELECTION))
            inputsValid = false
        }
        if(genre !== undefined && genre !== '' && isNotValidDropdownItem(genre, genreDescription)){
            dispatch(addError(INVALID_DROPDOWN_SELECTION))
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