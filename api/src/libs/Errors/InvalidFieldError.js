class InvalidFieldError extends Error{
    constructor(message){
        super(message)

        this.name = 'InvalidField'
    }
}

module.exports = InvalidFieldError