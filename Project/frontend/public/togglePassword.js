window.addEventListener("load", function () {

    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#id_password');

    togglePassword.addEventListener('click', function (e) {
        // toggle the type attribute
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        // Change the eye slash icon. Could have used only toogle instructionbut does not work in viceversa.
        classToChange = this.classList.item(2);
        this.classList.remove(classToChange);
        if (classToChange == 'fa-eye-slash') {
            this.classList.add('fa-eye');
        } else {
            this.classList.add('fa-eye-slash');
        }
    });

});