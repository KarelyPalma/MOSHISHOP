function agregar() {
  const token = localStorage.getItem('token');
    Swal.fire({
      title: 'Add category',
      html:
        '<input id="nombre" class="swal2-input" placeholder="Nombre de la categoria">',
      
      showCancelButton: true,
      confirmButtonText: 'Add',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        const nombre = Swal.getPopup().querySelector('#nombre').value;
        if (!nombre) {
          Swal.showValidationMessage(`Por favor, completa todos los campos`);
        }
      return fetch('https://moshishop.up.railway.app/categorias/agregar',{
        method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': token
            },
  
            body: JSON.stringify({
              nombre:nombre,
            })
      })
      .then(response=> response.json())
      .then(data => {
        console.log(data)
          swal.fire({
            text:'los datos se agregaron correctamente',
            icon:'success'
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

  function remove(){
    const token = localStorage.getItem('token');
    Swal.fire({
      title: 'Eliminar categoria',
      text: 'Ingrese el nombre de la categoria',
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
      preConfirm: (nombre) => {
        return fetch(`https://moshishop.up.railway.app/categorias/eliminarPorNombre/${nombre}`, {
          method: 'DELETE',
          headers:{
            "Content-Type": "application/json",
            'Authorization': token
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
        title: 'categoria eliminada',
        text: 'la categoria ha sido eliminado correctamente.',
        icon: 'success'
        });
    }
    recargarPagina();
    });
    
}
fetch('https://moshishop.up.railway.app/categorias/buscarTodos')
.then(response => response.json())
.then(categorias => {
const tableBody = document.querySelector('#users-table');

categorias.forEach(categoria => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${categoria.id}</td>
    <td>${categoria.nombre}</td>
    <td>${categoria.createdAt}</td>
    <td>${categoria.updatedAt}</td>
    `;
    tableBody.appendChild(row);
});
});

function recargarPagina() {
location.reload();
}