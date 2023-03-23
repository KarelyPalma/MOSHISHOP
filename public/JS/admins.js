function agregar() {
    const token = localStorage.getItem('token');
    Swal.fire({
      title: 'Add admin',
      html:
        '<input id="nombre" class="swal2-input" placeholder="Name and last name">' +
        '<input id="correo" class="swal2-input" placeholder="email">'+
        '<input id="password" class="swal2-input" placeholder="password">'+ 
        '<input id="telefono" class="swal2-input" placeholder="cell phone number">'+
        '<input id="Direccion" class="swal2-input" placeholder="address">',
      
      showCancelButton: true,
      confirmButtonText: 'Add',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        const nombre = Swal.getPopup().querySelector('#nombre').value;
        const correo = Swal.getPopup().querySelector('#correo').value;
        const password = Swal.getPopup().querySelector('#password').value;
        const telefono = Swal.getPopup().querySelector('#telefono').value;
        const Direccion = Swal.getPopup().querySelector('#Direccion').value;
  
        if (!nombre || !correo || !password || !telefono || !Direccion) {
          Swal.showValidationMessage(`Por favor, completa todos los campos`);
        }
      return fetch('https://moshishop.up.railway.app/usuarios//registro-admins',{
        method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': token,
            },
  
            body: JSON.stringify({
              nombre:nombre,
              correo:correo,
              password:password,
              telefono:telefono,
              Direccion:Direccion
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
      title: 'Eliminar admin',
      text: 'Ingrese el correo del admin que desea eliminar',
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
      preConfirm: (correo) => {
        return fetch(`https://moshishop.up.railway.app/usuarios/eliminarAdmin/${correo}`, {
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
          Swal.showValidationMessage(`Error al eliminar el administrador: ${error}`);
        });
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
    .then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'administrador eliminado',
          text: 'El administrador ha sido eliminado correctamente.',
          icon: 'success'
        });
      }
      recargarPagina();
    });
    
  }

  //metodo get
  const token = localStorage.getItem('token');
  fetch('https://moshishop.up.railway.app/usuarios/buscarAdmins',{
    method: 'GET',
    headers:{
        "Content-Type": "application/json",
        'Authorization': token
      }
  })
.then(response => response.json())
.then(Usuarios => {
  const tableBody = document.querySelector('#users-table');
  
  Usuarios.forEach(usuario => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${usuario.id}</td>
      <td>${usuario.nombre}</td>
      <td>${usuario.correo}</td>
      <td>${usuario.password}</td>
      <td>${usuario.telefono}</td> 
      <td>${usuario.Direccion}</td>
      <td>${usuario.RoleNombre}</td>
    `;
    tableBody.appendChild(row);
  });
});
//cada que agreguemos algo se recargara la pagina
function recargarPagina() {
    location.reload();
  }