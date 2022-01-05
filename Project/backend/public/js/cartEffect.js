$(function () {                                                     // Esto es lo mismo que window onload pero en JQuery.

    $('.boton-agregar-carrito').click(function (e) {                // Formulario sobre el cual ejecutar la función. Ojo uso el botón click, no submit del form.

        if ($('#icono-carrito').length) {                           // Chequeo si el elemento existe (por usuario logueado). Es lo mismo que: document.getElementById('#icono-carrito') != null

            e.preventDefault();

            let cart = $('#icono-carrito');                         // Se selecciona el icono del carrito.

            let imgtodrag = $('.foto-principal img');               // Imagen a colocar en el carrito.

            if (imgtodrag) {                                        // De internet.

                /* Clona la imagen y la mueve al carrito con efectos */
                let imgclone = imgtodrag.clone()
                    .offset({
                        top: imgtodrag.offset().top,
                        left: imgtodrag.offset().left
                    })
                    .css({
                        'opacity': '0.8',
                        'position': 'absolute',
                        'height': '150px',
                        'width': '150px',
                        'z-index': '100'
                    })
                    .appendTo($('body'))
                    .animate({
                        'top': cart.offset().top + 10,
                        'left': cart.offset().left + 10,
                        'width': 75,
                        'height': 75
                    }, 900, 'easeInOutExpo');                       // Tiempo que viaja la imagen.

                /* Desvanece la imagen cuando llega al carrito*/
                imgclone.animate({
                    'width': 0,
                    'height': 0
                }, function () {
                    $(this).detach()
                });

                /* Se mueve el carrito cuando llegó la imagen y ejecuta el formulario */
                setTimeout(function () {
                    cart.effect("shake", { times: 2 }, 300, function () {   // Rapidez con que se mueve el carrito. LA función es un CALLBACK que se ejecutará despues de la primera animación. Es una forma de hacer que se ejecute despues de la animación. Podríamos usar otras como con otro setTime pero esta es la mas conveniente. Si colocamos otra 
                        $('#form-agregar-al-carrito').submit();             // Submiteo del formulario DESPUES de que la animación haya terminado.
                    });
                }, 1500);                                                   // Tiempo que ESPERA para moverse el carrito una vez que llegó la imagen.
            };
        };
    });
});