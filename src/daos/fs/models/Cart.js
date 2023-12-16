import * as sec from './../extas/security.js'


export class Cart {
    #id
    #products

    constructor(id,productsList=null){
        this.#products=[]

        this.#id= sec.requiredValue(id,'id')

        if(productsList !=null){
            this.logProdcuts(productsList)
        }
    }

    get id(){
        return this.#id
    }
    
    set products(value){
        throw new Error('Utilice la funcion addProduct() para ingresar imagenes al products')
    }

    get products(){
        return [...this.#products]
    }

    logProdcuts(products){
        this.#products= [...products]
    }

    addProduct(prodId){

        if(typeof prodId === 'string'){
            try {
                prodId = parseInt(prodId)
            } catch (error) {
                throw new Error('tipo de dato invalido.')    
            }
        }

        if(typeof prodId != 'number'){
            throw new Error('Debe ingresar un numero.')
            
        }

        const itExist= this.#products.find(item => item.id == prodId)

        if(itExist != null){
            const index= this.#products.findIndex(item => item.id ==prodId)
            this.#products[index].counter++
        }else{
            this.#products.push({id:prodId, counter:1})
        }

    }


    print(){
        return {
            id:this.id,
            products:this.products
        }
    }


}

