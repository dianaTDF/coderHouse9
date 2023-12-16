import { pm } from "../services/ProductManager.js"

await pm.checkSettings()

export async function getController(req, res) {
  if (req.params.pid != null){
    
    try {
      const prod = await pm.search(req.params.pid)
      res.json(prod)
    } catch (error) {
      res.json({errorMessage:`el elemento de id ${req.params.pid} no existe`})        
    }

  } else{
    const limit =req.query.limit
    if(limit != null){

      const prods = await pm.getAll()
      console.log('Mostrar productos')
      
      res.json(prods.slice(0,limit))

    }else{
      const prods = await pm.getAll()
      console.log('Mostrar productos')
      res.json(prods)
    }
  }   
}

  
export async function postController(req, res) {
    console.log('Agregar producto')
    const prod = req.body
    
    try {
      const newProd=await pm.add(prod)
      res.json(newProd)
    } catch (error) {
      res.json({errorMessage:`error al ingresar los datos`})        
    }

  }


export async function putController(req, res) {
  console.log(`editar producto de id ${req.params.pid}`)
  const prod = req.body  
  const result =await pm.update(req.params.pid,prod)
  res.json(result)
}


export async function deleteController(req, res) {
  console.log(`eliminar producto de id ${req.params.pid}`)
  const prod = req.body
  try {
    await pm.delete(req.params.pid)
    res.json(prod)
  
  } catch (error) {
    res.json({errorMessage:`el elemento de id ${req.params.pid} no existe`})        
  }
  
}