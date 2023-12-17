# segunda pre entrega
- usar
  - mongodb 
  - populate
  - socket.io

### products:
|method|url|params|detaill|
|-|-|-|-|
|**get**|*api/products/*|limit, page, sort, query|filtrar los resultados acorde a los parametros previamente enviados|

|method|url|json|detaill|
|-|-|-|-|
|**get**|*web/products/*|limit, page, sort, query|vista con el resultado de la otra ruta, (agregar un voton de agegar a carrito)|
|**get**|*web/products/:pid*|-|vista donde este el detalle|

### carts:
|method|url|json|detaill|
|-|-|-|-|
|**get**|*api/carts/:cid*|-|con populate traer los productos|
|**delete**|*api/carts/:cid/products/:pid*|-|elimina el producto del carrito|
|**delete**|*api/carts/:cid/*|-|vaciara el carrito|
|**put**|*api/carts/:cid/products/:pid*|cantidad **??**|se actualizara el producto seleccionado acorde a la cantidad enviada|
|**put**|*api/carts/:cid/*|{{prodId: Y, count: X}...}|debera recibir un json de productos y actualizar sus valores|

|method|url|json|detaill|
|-|-|-|-|
|**get**|*web/carts/:cid/*|-|vista para presentar visualmente los carritos de ese carro|


---

generar enlace a products