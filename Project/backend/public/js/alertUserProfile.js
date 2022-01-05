// Utilizamos la librería sweetAlert2 para los mensajes del navegador. Simplemente es una promesa a la cual se le pasa un objeto definiendo los estilos y mensajes.

$('#form-baja').submit(function (e) {
    e.preventDefault();

    Swal.fire({                                         // Así funciona sweetAler, dentro el objeto define los estlos.
        title: 'Desea darse de baja?',
        text: "Esta acción no se puede revertir!",
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {                               // Al resolverse la promesa, ejecutamos las acciones que deseamos.
        if (result.isConfirmed) {
            this.submit();                              // Con this apuntamos a este mismo formulario.
        }
    })
});

$('.boton-cerrar-sesion-formulario').click(function (e) {
    e.preventDefault();

    Swal.fire({
        title: 'Desea cerrar sesión?',
        //text: "Solo podrán usuarios logueados",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location='/users/logout';
        }
    })
});
