import * as sec from './../extas/security.js'


export class Product {
    #id
    #thumbnails

    constructor(id,{title,description="Sin descripcion",code,price,status=true,thumbnails=null,stock,category}){
        this.#thumbnails=[]

        this.#id=       sec.requiredValue(id,'id')
        this.title=     sec.stringValue(title, 'title')
        this.description=sec.stringValue(description, 'description')
        this.code=      sec.requiredValue(code,'code')
        this.price =    sec.requiredPositiveValue(price,'precio')
        this.status=    sec.boolValue(status, 'status')
        this.stock =    sec.requiredPositiveValue(stock,'stock')       
        this.category=  sec.stringValue(category, 'category')

        if(thumbnails!=null){
            this.addPicture(thumbnails)
        }
    }

    get id(){
        return this.#id
    }
    
    set thumbnails(value){
        throw new Error('Utilice la funcion addPicture() para ingresar imagenes al thumbnails')
    }

    get thumbnails(){
        return [...this.#thumbnails]
    }

    addPicture(element){

        if(typeof element === 'number'){
            throw new Error('No puedes ingresar numero en thumbnails.')
        }
        
        //considerar si lo que ingresa el usuario es una imagen o multiples imagenes a la vez
        if(typeof element === 'string'){
            element=[element]
        }
        element.forEach(img => {
            if(sec.isImageFormat(img)){

                if(!this.#thumbnails.includes(img)){
                    this.#thumbnails.push(img)  
                }
            }
            else{
                console.log(`${img} no tiene un formato permitido`)
                //throw new Error('La imagen que intenta ingresar no tiene un formato permitido.')
            }
        });
    }

    resetPictures(element=null){
        this.#thumbnails=[]
        if(element!=null){
            this.addPicture(element)
        }
    }

    print(){
        return {
            id:this.id,
            title:this.title,
            description:this.description,
            code:this.code,
            price:this.price,
            status:this.status,
            thumbnails: this.thumbnails,
            stock:this.stock,
            category:this.category
        }
    }


}
