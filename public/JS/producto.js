//------esta funcion es para agregar datos a la base de datos
function abrirModal() {
  const token = localStorage.getItem('token');
  Swal.fire({
    title: 'Add Product',
    html:
      '<input id="nombre" class="swal2-input" placeholder="Name">' +
      '<input id="descripcion" class="swal2-input" placeholder="Descrption">' +
      '<input id="cantidad" class="swal2-input" placeholder="Stock">'+
      '<input id="precio" class="swal2-input" placeholder="Price">'+ 
      '<input id="codigo" class="swal2-input" placeholder="Code Prpduct">'+
      '<input id="CategoriaNombre" class="swal2-input" placeholder="Category">',
    
    showCancelButton: true,
    confirmButtonText: 'Add',
    cancelButtonText: 'Cancel',
    preConfirm: () => {
      const nombre = Swal.getPopup().querySelector('#nombre').value;
      const descripcion = Swal.getPopup().querySelector('#descripcion').value;
      const cantidad = Swal.getPopup().querySelector('#cantidad').value;
      const precio = Swal.getPopup().querySelector('#precio').value;
      const codigo = Swal.getPopup().querySelector('#codigo').value;
      const CategoriaNombre = Swal.getPopup().querySelector('#CategoriaNombre').value;

      if (!nombre || !descripcion || !cantidad || !precio || !codigo || !CategoriaNombre) {
        Swal.showValidationMessage(`Por favor, completa todos los campos`);
      }
    return fetch('https://moshishop.up.railway.app/Productos/agregarP',{
      method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': token,
          },

          body: JSON.stringify({
            nombre:nombre,
            descripcion:descripcion,
            cantidad:cantidad,
            precio:precio,
            codigo:codigo,
            CategoriaNombre:CategoriaNombre
          })
    })
    .then(response=> response.json())
    .then(data => {
        swal.fire({
          text:'los datos se agregaron correctamente',
          icon:'succes'
        });
        recargarPagina();
    })
    .catch(error =>{
      swal.fire({
        title:'error',
        icon:'error'
      });
    })
    }
  })

}
//-----esta funcion actualiza los datos del producto
function actualizar() {
  const token = localStorage.getItem('token');
  Swal.fire({
    title: 'Add Product',
    html:
      '<input id="nombre" class="swal2-input" placeholder="Name">' +
      '<input id="descripcion" class="swal2-input" placeholder="Descrption">' +
      '<input id="cantidad" class="swal2-input" placeholder="Stock">'+
      '<input id="precio" class="swal2-input" placeholder="Price">'+ 
      '<input id="codigo" class="swal2-input" placeholder="Code Prpduct">'+
      '<input id="CategoriaNombre" class="swal2-input" placeholder="Category">',
    
    showCancelButton: true,
    confirmButtonText: 'Add',
    cancelButtonText: 'Cancel',
    preConfirm: () => {
      const nombre = Swal.getPopup().querySelector('#nombre').value;
      const descripcion = Swal.getPopup().querySelector('#descripcion').value;
      const cantidad = Swal.getPopup().querySelector('#cantidad').value;
      const precio = Swal.getPopup().querySelector('#precio').value;
      const codigo = Swal.getPopup().querySelector('#codigo').value;
      const CategoriaNombre = Swal.getPopup().querySelector('#CategoriaNombre').value;

      if (!nombre ||!descripcion|| !cantidad || !precio || !codigo || !CategoriaNombre) {
        Swal.showValidationMessage(`Por favor, completa todos los campos`);
      }
    return fetch('https://moshishop.up.railway.app/Productos/actualizar',{
      method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'Authorization': token,
          },

          body: JSON.stringify({
            nombre:nombre,
            descripcion:descripcion,
            cantidad:cantidad,
            precio:precio,
            codigo:codigo,
            CategoriaNombre:CategoriaNombre
          })
    })
    .then(response=> response.json())
    .then(data => {
      if(!data[0] != undefined){
        swal.fire({
          text:'los datos se actualizaron',
          icon:'succes'
        }); 
        recargarPagina();
      }
        
       
      /*else{
        swal.fire({
          text:'No se pudo agregar el producto',
          icon:'error'
        });
      }*/

    }).catch(error =>{
      swal.fire({
        title:'error',
        icon:'error'
      });
    })
    }
  })
}
//-----esta funcion es para remover datos de la base de datos
function remove(){
  const token = localStorage.getItem('token');
  Swal.fire({
    title: 'Eliminar producto',
    text: 'Ingrese el código o ID del producto que desea eliminar:',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar',
    showLoaderOnConfirm: true,
    inputValidator: (value) => {
      if (!value.trim()) {
        return 'El campo no puede estar vacío';
      }
    },
    preConfirm: (codigo) => {
      return fetch(`https://moshishop.up.railway.app/Productos/eliminarID/${codigo}`, {
        method: 'DELETE',
        headers:{
          'Authorization': token,
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .catch(error => {
        Swal.showValidationMessage(`Error al eliminar el producto: ${error}`);
      });
    },
    allowOutsideClick: () => !Swal.isLoading()
  })
  .then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Producto eliminado',
        text: 'El producto ha sido eliminado correctamente.',
        icon: 'success'
      });
    }
    recargarPagina();
  });
  
}

// ----- esta funcion es para mostrar los productos
fetch('https://moshishop.up.railway.app/Productos/buscar')
.then(response => response.json())
.then(Productos => {
  const tableBody = document.querySelector('#users-table');
  
  Productos.forEach(Producto => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${Producto.nombre}</td>
      <td>${Producto.descripcion}</td>
      <td>${Producto.cantidad}</td>
      <td>${Producto.precio}</td> 
      <td>${Producto.CategoriaNombre}</td>
      <td>${Producto.codigo}</td>
    `;
    tableBody.appendChild(row);
  });
});

function recargarPagina() {
  location.reload();
}