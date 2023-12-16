const socket = io()
const listDiv= document.getElementById('products_list')

/* --------------------------------- mensajes -------------------------------- */
socket.on(`errorMessage`, error =>{
  alert(`ERROR: ${error.message}`)
})
socket.on(`successMessage`, success =>{
  alert(`${success.message}`)
})


/* --------------------------- enlistar productos --------------------------- */
socket.on('prodList',products => {
    listDiv.innerHTML = ''
    for (const {_id, title ,description,code,price,status,stock,category} of products) {
      const createdDiv = document.createElement('div')
      createdDiv.innerHTML = `<h3>${title}</h3>`
      createdDiv.innerHTML += `<ul>`
      createdDiv.innerHTML += `<li>descripcion:${description} </li>`
      createdDiv.innerHTML += `<li>codigo:${code} </li>`
      createdDiv.innerHTML += `<li>precio:${price} </li>`
      createdDiv.innerHTML += `<li>status:${status} </li>`
      createdDiv.innerHTML += `<li>inventario:${stock} </li>`
      createdDiv.innerHTML += `<li>categoria:${category} </li>`
      createdDiv.innerHTML += `</ul>`
      const delButton = document.createElement('button')
      delButton.innerHTML= 'Eliminar'
      delButton.setAttribute("onclick","deleteProd(event)");
      delButton.setAttribute("data-product",_id)
      createdDiv.appendChild(delButton)
      createdDiv.innerHTML += `<hr>`

      listDiv.appendChild(createdDiv)
    }
  })

/* ------------------------------ el forulario ------------------------------ */
const form = document.getElementById('newProd')

form?.addEventListener('submit', async event =>{
  event.preventDefault()

  const data  = new FormData(form)
  const json = Object.fromEntries(data)
  const newProduct= JSON.stringify(json)

  if(Number(newProduct.price) < 0 || Number(newProduct.stock) < 0 ){
    alert(`no puede ingresar valores negativos, intente con otros valores`)
  }else{
    console.log(newProduct)
    socket.emit('prodAdd',newProduct)
  }

})


/* ------------------------------- eliminacion ------------------------------ */
function deleteProd(event){
  const id = event.target.getAttribute('data-product')
  //console.log(`eliminado ${id}`)
  socket.emit('prodDel',id)

}