const productosContainer = document.getElementById('productos-container');
let botonId =0;
fetch('https://moshishop.up.railway.app/Productos/buscar')
  .then(response => response.json())
  .then(Productos => {
    Productos.forEach(Producto => {
      const card = `
        <div class="col-md-4">
        <div class="card">
          <img class="card-img-top" src="${Producto.imagen}" alt="">
          <div class="card-body">
            <h5 class="card-title">${Producto.nombre}</h5>
            <p class="card-text">${Producto.descripcion}</p>
            <p class="card-text">$ ${Producto.precio}</p>
            <button id="bt-${botonId}" class="btn btn-primary">Comprar</button>
          </div>
        </div>
        </div>
      `;
      productosContainer.innerHTML += card;
      
      const botonComprar = document.getElementById(`bt-${botonId}`);
      botonComprar.onclick = function() {
        alert('Botón comprar clickeado');
        // Aquí puedes agregar la lógica para realizar la compra del producto
      };

      botonId++; 

    });
  })
  .catch(error => console.error(error));
  
