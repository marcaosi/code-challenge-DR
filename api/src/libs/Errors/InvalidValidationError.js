class InvalidValidationError extends Error{
    constructor(message){
        super(message)

        this.name = 'InvalidValidation'
    }
}

module.exports = InvalidValidationError