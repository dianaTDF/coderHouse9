const socket = io()



function addItem(event){
    event.preventDefault()

    const form =event.target
    
    const pid=form.querySelector('input[type="hidden"]').value
    socket.emit('addProduct',pid)
}

/* ----------------------- presentar carrito en vista ----------------------- */
socket.on(`checkCart`, cart =>{
    const existLink= document.getElementById("cartButton") == null

    console.log(existLink)
    if(existLink){
        const button=document.createElement('button');
        button.innerHTML= "ir a carrito";

        const cartLink = document.createElement('a');
        cartLink.setAttribute("id", "cartButton");
        cartLink.href = `http://localhost:8080/carts/${cart}`
        cartLink.appendChild(button)
        console.log('hola')

        const nav=document.getElementById('navPrototype')
        nav.appendChild(cartLink)
}
})



/* ---------------------- carga y gestion de productos ---------------------- */
/* ------------------------ administracion de paginas ----------------------- */
const linksDiv = document.getElementById('links')
const totalPage= linksDiv.dataset.total
const limit= linksDiv.dataset.limit
const actualPage= linksDiv.dataset.actual
const prevPage= linksDiv.dataset.prev?linksDiv.dataset.prev:null
const nextPage= linksDiv.dataset.next?linksDiv.dataset.next:null
const title= linksDiv.dataset.title?linksDiv.dataset.title:null
const sort= linksDiv.dataset.sort?linksDiv.dataset.sort:null

let urlOptions=''
if(title){
    urlOptions=+`&&query=${title}`
}
if(sort){
    urlOptions=+`&&sort=${sort}`
}

if(prevPage){
    const prevLink = document.createElement('a');
    prevLink.href = `http://localhost:8080/products?page=${prevPage}&&limit=${limit}`+urlOptions
    prevLink.textContent = 'Anterior';
    linksDiv.appendChild(prevLink);
}

for (let index = 1; index <= totalPage; index++) {
    if(index != actualPage){
        const prevLink = document.createElement('a');
        prevLink.href = `http://localhost:8080/products?page=${index}&&limit=${limit}`+urlOptions
        prevLink.textContent = `${index}`;
        linksDiv.appendChild(prevLink);    
    }else{
        const prevLink = document.createElement('span');
        prevLink.innerHTML = `${index}`;
        linksDiv.appendChild(prevLink);    
    }
}

if(nextPage){
    const nextLink = document.createElement('a');
    nextLink.href = `http://localhost:8080/products?page=${nextPage}&&limit=${limit}`+urlOptions
    nextLink.textContent = 'Siguientes';
    linksDiv.appendChild(nextLink);
}




/* const fristLink =document.getElementById('first')
const lastLink = document.getElementById('last')
 */
/* 
{"title":"productos",
"docs":[
    {"_id":"94f02235-0aab-4610-8fed-790a63d072d6","title":"Producto A","description":"Una herramienta multifunción para tareas domésticas.","code":"PROD-A001","price":39.99,"status":"Disponible","stock":50,"category":"Herramientas","thumbnails":["imagen1.jpg","imagen2.jpg"],"__v":0},
    {"_id":"48187dfb-7d14-42b9-813d-84f2724ffebb","title":"Producto B","description":"Auriculares inalámbricos con cancelación de ruido.","code":"PROD-B002","price":89.99,"status":"Disponible","stock":30,"category":"Electrónicos","thumbnails":["imagen3.jpg","imagen4.jpg"],"__v":0},
    {"_id":"665f781c-85b5-4f04-ab3e-a26ee1bd7098","title":"Producto C","description":"Camiseta de algodón con diseño moderno.","code":"PROD-C003","price":19,"status":"Agotado","stock":10,"category":"Ropa","thumbnails":["imagen5.jpg","imagen6.jpg"],"__v":0},
    {"_id":"74552ed1-d59e-4f56-919c-a55ba6e99389","title":"Producto D","description":"Juego de utensilios de cocina antiadherentes.","code":"PROD-D004","price":49,"status":"Disponible","stock":25,"category":"Cocina","thumbnails":["imagen7.jpg","imagen8.jpg"],"__v":0},
    {"_id":"bc901c73-fb8b-4d0c-900f-5ca5ab9cf73b","title":"Producto E","description":"Mochila resistente al agua para actividades al aire libre.","code":"PROD-E005","price":59.99,"status":"Disponible","stock":40,"category":"Deportes","thumbnails":["imagen9.jpg","imagen10.jpg"],"__v":0},
    {"_id":"d5020c9f-32e5-4357-9b74-5a83b7835d78","title":"Producto F","description":"Libro de ciencia ficción bestseller.","code":"PROD-F006","price":14,"status":"Disponible","stock":100,"category":"Libros","thumbnails":["imagen11.jpg","imagen12.jpg"],"__v":0},
    {"_id":"8684bb13-c998-4dd2-bed9-5d221a9f0a82","title":"PROD 1","description":"info","code":"AB121","price":123,"status":"true","stock":12,"category":"Nuevo","thumbnails":[""],"__v":0},
    {"_id":"163ad539-74e1-4a09-9c0e-6aa7dc6f9444","title":"PROD 12","description":"infoss","code":"AB121","price":11,"status":"true","stock":9,"category":"Nuevo","thumbnails":[""],"__v":0},
    {"_id":"17ab217e-7e27-4283-bcd8-a634dc7ac85e","title":"asda","description":"sdada","code":"wqe","price":4,"status":"true","stock":6,"category":"sada","thumbnails":[""],"__v":0},
    {"_id":"cc76a117-69d7-4a73-8539-0bc2eb160363","title":"Coffee Maker","description":"Modern coffee maker for brewing delicious coffee.","code":"CM003","price":89,"status":"Active","stock":15,"category":"Appliances","thumbnails":["coffee_maker1.jpg","coffee_maker2.jpg"],"__v":0}],
"totalDocs":23,
"limit":10,
"totalPages":3,
"page":1,
"pagingCounter":1,
"hasPrevPage":false,
"hasNextPage":true,
"prevPage":null,
"nextPage":2} */


/* 
"_id":"94f02235-0aab-4610-8fed-790a63d072d6",
"title":"Producto A",
"1":"Una herramienta multifunción para tareas domésticas.",
"code":"PROD-A001",
"price":39.99,
"status":"Disponible",
"stock":50,
"category":"Herramientas",
"thumbnails":["imagen1.jpg","imagen2.jpg"]

*/