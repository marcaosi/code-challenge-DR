const { InvalidValidationError, InvalidFieldError } = require('../Errors')

const valid = (field, constraint, object) => {
    // required
    if(constraint === 'required'){
        if(!object[field] || object[field].length === 0){
            throw new InvalidFieldError(`Field ${field} is invalid. It is required.`)
        }
    }

    // string
    if(constraint === 'string'){
        if(typeof object[field] !== 'string'){
            throw new InvalidFieldError(`Field ${field} must be a string.`)
        }
    }

    // number
    if(constraint === 'number'){
        if(typeof object[field] !== 'number'){
            throw new InvalidFieldError(`Field ${field} must be a number.`)
        }
    }

    // min
    if(constraint.indexOf('min') !== -1){
        const [min, value] = constraint.split('=')

        if(object[field] < value){
            throw new InvalidFieldError(`Field ${field} must be > ${value}`)
        }
    }

    // max
    if(constraint.indexOf('max') !== -1){
        const [max, value] = constraint.split('=')

        if(object[field] > value){
            throw new InvalidFieldError(`Field ${field} must be < ${value}`)
        }
    }

    // date (yyyy-mm-dd)
    if(constraint === 'date'){
        const regex = /\d{4}-\d{2}-\d{2}/

        if(!regex.test(object[field])){
            throw new InvalidFieldError(`Field ${field} must be a date on format: YYYY-MM-DD.`)
        }
    }
}

const validate = (object, validations = []) => {
    if(validations.length === 0) return true

    validations.forEach(validation => {
        if(validation.indexOf(':') === -1){
            throw new InvalidValidationError(`Validation is not valid. Use the pattern: field:validation`)
        }
        let [field, criteria] = validation.split(':')

        // valid field name
        if(!field || field.length === 0){
            throw new InvalidValidationError(`Validation is not valid. Use the pattern: field:validation`)
        }

        // valid validations separated by |
        criteria = criteria.split('|')

        criteria.forEach(item => {
            valid(field, item, object)
        })
    })
}

module.exports = {
    validate
}