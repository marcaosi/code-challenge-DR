module.exports = {
    calcPaintCans: (totalArea, availablePaintCans, requiredPaintCans) => {
        let paintCans = availablePaintCans.all
        if(!requiredPaintCans){
            requiredPaintCans = {}
            paintCans.forEach(paintCan => {
                requiredPaintCans[paintCan] = 0.0
            })
        }

        if(totalArea < availablePaintCans.min){
            requiredPaintCans[availablePaintCans.min] += 1
            return requiredPaintCans
        }

        while(paintCans.length > 0 && totalArea > availablePaintCans.min){
            let availableMax = Math.max.apply(Math, paintCans)

            if(totalArea >= availableMax){
                let countPaintCans = parseInt(totalArea / availableMax)

                totalArea = totalArea % availableMax

                requiredPaintCans[availableMax] += countPaintCans
            }
            paintCans = paintCans.filter(paintCan => paintCan !== availableMax)
        }

        if(totalArea <= availablePaintCans.min && totalArea > 0){
            requiredPaintCans[availablePaintCans.min] += 1
            return requiredPaintCans
        }

        return requiredPaintCans
    }
}