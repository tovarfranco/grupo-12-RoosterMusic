// Utilizamos la librería sweetAlert2 para los mensajes del navegador. Simplemente es una promesa a la cual se le pasa un objeto definiendo los estilos y mensajes.

$('#form-eliminar').submit(function (e) {
    e.preventDefault();

    Swal.fire({                                         // Así funciona sweetAlert, dentro el objeto define los estlos.
        title: 'Desea eliminar el producto?',
        text: "Esta acción no se puede revertir!",
        icon: 'warning',
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

$('#form-comprar').submit(function (e) {
    e.preventDefault();

    Swal.fire({
        title: 'Desea comprar el producto?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            this.submit();
        }
    })
});
