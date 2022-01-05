window.addEventListener("load", function () {

    const botonHamburguesa = document.querySelector('.boton-hamburguesa');
    const toggleIcon = document.querySelector('#toggle-icon');
    const sidebar = document.querySelector('#sidebar');

    botonHamburguesa.addEventListener('click', function (e) {
        // Change the icon. Could have used only toogle instruction but does not work in viceversa.
        classToChange = toggleIcon.classList.item(1);
        toggleIcon.classList.remove(classToChange);
        if (classToChange == 'fa-times') {
            toggleIcon.classList.add('fa-bars');
            sidebar.style.display = "none";
        } else {
            toggleIcon.classList.add('fa-times');
            sidebar.style.display = "block";
        }
    });

});