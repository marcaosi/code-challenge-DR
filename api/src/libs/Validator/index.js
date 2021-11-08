const { InvalidValidationError, InvalidFieldError } = require('../Errors')

const valid = (field, constraint) => {
    // required
    if(constraint === 'required'){
        if(!field || field.length === 0){
            throw new InvalidFieldError(`Field ${field} is invalid. It is required.`)
        }
    }

    // string
    if(constraint === 'string'){
        if(typeof field !== 'string'){
            throw new InvalidFieldError(`Field ${field} must be a string.`)
        }
    }

    // number
    if(constraint === 'number'){
        if(typeof field !== 'number'){
            throw new InvalidFieldError(`Field ${field} must be a number.`)
        }
    }

    // min
    if(constraint.indexOf('min') !== -1){
        const [min, value] = constraint.split('=')

        if(field < value){
            throw new InvalidFieldError(`Field ${field} must be < ${value}`)
        }
    }

    // max
    if(constraint.indexOf('max') !== -1){
        const [max, value] = constraint.split('=')

        if(field < value){
            throw new InvalidFieldError(`Field ${field} must be < ${value}`)
        }
    }

    // date (yyyy-mm-dd)
    if(constraint === 'date'){
        const regex = /\d{4}-\d{2}-\d{2}/

        if(!regex.test(field)){
            throw new InvalidFieldError(`Field ${field} must be a date on format: YYYY-MM-DD.`)
        }
    }
}

const validator = (object, validations = []) => {
    if(validations.length === 0) return true

    validations.forEach(validation => {
        if(validation.indexOf(':') === -1){
            throw new InvalidValidationError(`Validation is not valid. Use the pattern: field:validation`)
        }
        const [field, criteria] = validation.split(':')

        // valid field name
        if(!field || field.length === 0){
            throw new InvalidValidationError(`Validation is not valid. Use the pattern: field:validation`)
        }

        // valid validations separated by |
        criteria.forEach(item => {
            const items = item.split('|')

            items.forEach(constraints => {
                valid(field, constraints)
            })
        })
    })
}

module.exports = validator