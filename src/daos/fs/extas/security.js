export function requiredValue(value, property){
        if (value == null || value == undefined)
            throw new Error(`ERROR: el campo "${property}" es obligatorio.`)
        return value
    }

export function stringValue(value, property){
        if (typeof this.requiredValue(value, property) !== 'string')
            throw new Error(`ERROR: el campo "${property}" debe ser string.`)
        return value
    }

export function boolValue(value, property){
    value =this.requiredValue(value, property)
    if (!(value === true || value === false) )
        throw new Error(`ERROR: el campo "${property}" debe ser booleano.`)
    return value
}


export function notNegativeValue(value){
        if (value < 0)
            throw new Error(`ERROR: ingreso un valor negativo`)
        return value
    }

export function requiredPositiveValue(value,property){
        return this.notNegativeValue(this.requiredValue(value,property))
    }

export function isImageFormat(value){
        const imgFormats=['jpg','jepg','png','PNG','JEPG','JPG','GIF','gif']
        const extension = value.split('.')[1] 
        return imgFormats.includes(extension)
    }
