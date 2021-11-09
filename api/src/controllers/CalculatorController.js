const Calculator = require('../libs/Calculator')
const { InvalidFieldError, InvalidValidationError } = require('../libs/Errors')
const validator = require('../libs/Validator')
const constants = require('../utils/constants')

const controller = {
    post: (req, res) => {
        try{
            const { walls } = req.body

            if(walls.length === 0){
                res.status(400)
                .send({
                    success: false,
                    message: 'At least one wall must be sent.'
                })
            }

            let totalAreaToPaint = 0
            // valid each wall
            walls.forEach(wall => {
                const validations = [
                    'width:required|number|min=1|max=15',
                    'height:required|number|min=1|max=15',
                    'doors:required|number|min=0',
                    'windows:required|number|min=0'
                ]
                validator.validate(wall, validations)

                if(wall.doors > 0 && (wall.height - constants.doorHeight) < constants.minHeightOverDoor){
                    throw new InvalidFieldError('The walls`s height must be at least .3 meters over the door.')
                }

                const totalAreaDoorsAndWindows = (wall.doors * constants.doorArea) + (wall.windows * constants.windowArea)

                const totalAreaWall = wall.height * wall.width

                if((totalAreaDoorsAndWindows * 2) > totalAreaWall){
                    throw new InvalidFieldError('There is many doors and/or windows on wall.')
                }

                totalAreaToPaint += (totalAreaWall - totalAreaDoorsAndWindows)
            })

            const requiredPaintCans = Calculator.calcPaintCans(totalAreaToPaint, constants.paintCans)

            res.status(200).send({
                success: true,
                totalAreaToPaint,
                requiredPaintCans
            })

            // calc wall`s area x window + door area
        }catch(error){
            let statusCode = 500

            if(typeof error === InvalidFieldError || typeof error === InvalidValidationError){
                statusCode = 400
            }

            res.status(statusCode)
               .send({
                   success: false,
                   message: error.message
               })
        }
    }
}

module.exports = controller