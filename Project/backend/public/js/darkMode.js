window.addEventListener("load", function () {

    /* Mi selector ---------------------------------------------------------*/
    const btnSwitch = document.querySelector('#switch');

    /* Vemos si tenemos guardado el modo dark ------------------------------*/
    if (localStorage.getItem('dark-mode') === 'true') {         // IMPORTANTE: este true es un string en localstorage.
        document.body.classList.add('body-dark');               // Si lo tengo lo activo.
        btnSwitch.classList.add('active');
    } else {
        document.body.classList.remove('body-dark');            // Si no lo tengo lo desactivo.
        btnSwitch.classList.remove('active');
    }

    /* Modificación ahora por botón ------------------------------*/
    btnSwitch.addEventListener('click', function () {
        document.body.classList.toggle('body-dark');
        btnSwitch.classList.toggle('active');

        /* Guardamos este último estado en localstorage */
        if (document.body.classList.contains('body-dark')) {
            localStorage.setItem('dark-mode', 'true');
        } else {
            localStorage.setItem('dark-mode', 'false');
        }
    });
});