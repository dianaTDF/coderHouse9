import fs from 'fs/promises'


export class FileManagment{
    #objectList
    #myObject
    #filePath
    #id
    constructor(path,obj){
        this.#id= 0
        this.#filePath= path
        this.#myObject= obj  
      }

    get id(){
        return this.#id
    }

    idIncrement(){
        this.#id++
    }

    get objectList(){
        return [...this.#objectList]
    }

    objectListPush(item){
        this.#objectList.push(item)
    }

    async checkSettings(){
        await this.checkFile()
    }

    async checkFile(){
        try {
            await fs.access(this.#filePath)
        } catch (error) {
            throw new Error('Error al analizar el archivo')
        }

        try {

            await this.load()
            
            if(this.#objectList.length > 0){
                this.#id= this.#objectList[this.#objectList.length-1].id            
                
            }
        } catch (error) {
            await fs.writeFile(this.#filePath,'[]')        
        }
    }


    async load(){
        try {
            const file= await fs.readFile(this.#filePath,'utf-8')
            if (file== ''){
                this.#objectList= JSON.parse('[]')
            }else{
                this.#objectList= JSON.parse(file)
            }

        } catch (error) {
            console.log('algo salio mal')
        }
    }

    async burn(){
        await fs.writeFile(this.#filePath, JSON.stringify(this.#objectList,null,2))
    }

    async destroy(){
        await fs.writeFile(this.#objectList,'[]')        
    }

    async getAll(){
        await this.load()
        return [...this.#objectList]
    }


    async add(data){
        await this.load()
        this.#id++
        const newObject= new this.#myObject(this.#id,this.cleanData(data))
        this.#objectList.push(newObject.print())
        
        await this.burn()
        return newObject.print()
    }

    
    async delete(id){
        if(await this.idExist(id)){

            const newList = this.#objectList.filter((x)=> x.id != id)
            this.#objectList= newList
            await this.burn()

        }else{
            throw new Error(`ERROR: producto de id ${id} no existe`)
        }
    }

    async update(id,data){
        if(await this.idExist(id)){

            const index= this.#objectList.findIndex((x) => x.id ==id)

            const newData=this.cleanData(data) 

            this.#objectList[index]={
                ...this.#objectList[index],
                ...newData
            }
            await this.burn()

            return {...this.#objectList[index]} 
    
        }

        throw new Error(`ERROR: elemento de id ${id} no se encuentra registrado`)
    }

    async idExist(id){
        await this.load()
        
        const itExist= this.#objectList.find(u => u.id == id)

        if(itExist==undefined){
            return false
        }else{
            return true
        }
    }

    async take(id){
        await this.load()
        return this.#objectList.find(u => u.id == id)
    }

    async search(id){
        if (await this.idExist(id)){
            return await this.take(id)
        }

        throw new Error(`ERROR: producto de id ${id} no existe`)
    }
    

    //para evitar que objetos con valores en un defined alteren los ya presentes en los items
    cleanData(object){
        Object.keys(object).
            forEach(atribute => object[atribute] == undefined && delete object[atribute]);

       return object            
    }


}