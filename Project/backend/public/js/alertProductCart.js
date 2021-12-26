// Utilizamos la librería sweetAlert2 para los mensajes del navegador. Simplemente es una promesa a la cual se le pasa un objeto definiendo los estilos y mensajes.

$(function () {                                             // Esto es lo mismo que window onload pero en JQuery.

    $('.cart-eliminar').click(function (e) {                // Formulario sobre el cual ejecutar la función. Ojo uso el botón click, no submit del form.
        e.preventDefault();

        let formToSubmit = $(this).closest('form');         // Formulario a submitear.

        Swal.fire({                                         // Así funciona sweetAlert, dentro el objeto define los estlos.
            title: 'Desea eliminar el producto del carrito?',
            text: "Puede agregarlo nuevamente desde la sección productos!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {                               // Al resolverse la promesa, ejecutamos las acciones que deseamos.
            if (result.isConfirmed) {
                formToSubmit.submit();                      // Con this apuntamos a este mismo formulario.
            }
        })
    });

    $('.cart-comprar').click(function (e) {                 // Formulario sobre el cual ejecutar la función. Ojo uso el botón click, no submit del form.
        e.preventDefault();

        let formToSubmit = $(this).closest('form');         // Formulario a submitear.

        Swal.fire({
            title: 'Desea comprar sólo este producto del carrito?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                formToSubmit.submit();
            }
        })
    });

    $('.boton-comprar').click(function (e) {                // Formulario sobre el cual ejecutar la función. Ojo uso el botón click, no submit del form.
        e.preventDefault();

        let formToSubmit = $(this).closest('form');         // Formulario a submitear.

        Swal.fire({
            title: 'Desea comprar todo el carrito?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Gracias por la compra!',
                    'Su compra fue registrada',
                    'success'
                ).then(() => formToSubmit.submit())         // Solo animación, no recibe confirmación del back, debería usarse API en el back y mediante AJAX (o FETCH) enviar/recibir la confirmación.
            }
        })
    });
});
