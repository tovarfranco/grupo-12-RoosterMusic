window.addEventListener("load", function () {

    /* Creo mi objeto de validaciones, algunos son expresiones regulares otras son funciones ----------------------------------------------------------------------*/
    const validacion = {
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,45}$/,                // Entre 1 y 45 caracteres. Sin simbolos espeicales.
        apellido: /^[a-zA-ZÀ-ÿ\s]{1,45}$/,              // Entre 1 y 45 caracteres. Sin simbolos espeicales.
        dni: /^\d{8}(?:[-\s]\d{4})?$/,                  // DNI de 8 dígitos.
        pais: (pais) => pais != '',                     // Función.
        domicilio: /\w+\s\w+/,                          // Alfanumérico + alfanumérico (ya que no sabemos laestructura de las calles y alturas).
        nacimiento: (nacimiento) => nacimiento != '',   // Función.
        email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,      // Formato de email.
    };

    /* Creo mi objeto de campos para indicar si hay errores en alguno. Seteados en falla=false ---------------------------------------------------------------------*/
    let campos = {
        // nombre: false,
        // apellido: false,
        // dni: false,
        // pais: false,
        // domicilio: false,
        // nacimiento: false,
        // email: false,
        // password: false
    };

    /* Voy a habiitar errores en función de los submits ------------------------------------------------------------------------------------------------------------*/
    let submits = 0;

    /* Selecciono mis elementos que quiero validar ------------------------------------------------------------------------------------------------------------------*/
    let formulario = document.querySelector(".formulario");         // Selecciono el formulario
    let inputs = document.querySelectorAll(".formulario input");    // Selecciono TODOS los inputs.
    let selects = document.querySelector("#pais-control")           // Selecciono el select ya que se comporta de otra forma.
    let terminos = document.querySelector("#terminos-control")      // Selecciono el terminos ya que tendrá otra lógica.
    let errores = document.getElementById("errores-msg");           // Selecciono este span para indicar errores.

    /* Este es el callback de los addEventListener de los elementos a validar ----------------------------------------------------------------------------------------*/
    function validaInput(input) {                                   // Por cada uno realizará una función. Recordar que es el callback del addEventListener que puede recibir el 'e'.
        switch (input.name) {                                       // OJO son los NAME del formulario, puedo cambiar el TODOS los e.target.name por this.name. Acá se pasó el this en la función.
            case "nombre":
                if (document.getElementById("exp-nombre") != null) {
                    document.getElementById("exp-nombre").style.display = "none"                     // Elimino lo que venga de express-validator.
                };

                if (validacion.nombre.test(input.value)) {
                    document.getElementById("nombre-msg").classList.remove("input-error");
                    document.getElementById("nombre-msg").classList.add("input-correct");
                    document.getElementById("nombre-msg").innerText = '✔ Nombre válido';
                    document.getElementById("nombre-control").classList.remove("control-error");
                    document.getElementById("nombre-control").classList.add("control-correct");
                    campos["nombre"] = true;                                                        // Indica que pasó la validación.
                } else {
                    document.getElementById("nombre-msg").classList.remove("input-correct");
                    document.getElementById("nombre-msg").classList.add("input-error");
                    document.getElementById("nombre-msg").innerText = '✘ Entre 1-45 caracteres. Sin símbolos especiales'
                    document.getElementById("nombre-control").classList.remove("control-correct");
                    document.getElementById("nombre-control").classList.add("control-error");
                    campos["nombre"] = false;                                                       // Indica que no pasó la validación.
                };
                break;

            case "apellido":
                if (document.getElementById("exp-apellido") != null) {
                    document.getElementById("exp-apellido").style.display = "none"                     // Elimino lo que venga de express-validator.
                };

                if (validacion.apellido.test(input.value)) {
                    document.getElementById("apellido-msg").classList.remove("input-error");
                    document.getElementById("apellido-msg").classList.add("input-correct");
                    document.getElementById("apellido-msg").innerText = '✔ Apellido válido';
                    document.getElementById("apellido-control").classList.remove("control-error");
                    document.getElementById("apellido-control").classList.add("control-correct");
                    campos["apellido"] = true;                                                        // Indica que pasó la validación.
                } else {
                    document.getElementById("apellido-msg").classList.remove("input-correct");
                    document.getElementById("apellido-msg").classList.add("input-error");
                    document.getElementById("apellido-msg").innerText = '✘ Entre 1-45 caracteres. Sin símbolos especiales'
                    document.getElementById("apellido-control").classList.remove("control-correct");
                    document.getElementById("apellido-control").classList.add("control-error");
                    campos["apellido"] = false;                                                       // Indica que nopasó la validación.
                };
                break;

            case "dni":
                if (document.getElementById("exp-dni") != null) {
                    document.getElementById("exp-dni").style.display = "none"                     // Elimino lo que venga de express-validator.
                };

                if (validacion.dni.test(input.value)) {
                    document.getElementById("dni-msg").classList.remove("input-error");
                    document.getElementById("dni-msg").classList.add("input-correct");
                    document.getElementById("dni-msg").innerText = '✔ DNI válido';
                    document.getElementById("dni-control").classList.remove("control-error");
                    document.getElementById("dni-control").classList.add("control-correct");
                    campos["dni"] = true;                                                               // Indica que pasó la validación.
                } else {
                    document.getElementById("dni-msg").classList.remove("input-correct");
                    document.getElementById("dni-msg").classList.add("input-error");
                    document.getElementById("dni-msg").innerText = '✘ 8 dígitos sin puntos'
                    document.getElementById("dni-control").classList.remove("control-correct");
                    document.getElementById("dni-control").classList.add("control-error");
                    campos["dni"] = false;                                                              // Indica que nppasó la validación.
                };
                break;

            case "pais":
                if (document.getElementById("exp-pais") != null) {
                    document.getElementById("exp-pais").style.display = "none"                          // Elimino lo que venga de express-validator.
                };

                if (validacion.pais(input.value)) {
                    document.getElementById("pais-msg").classList.remove("input-error");
                    document.getElementById("pais-msg").classList.add("input-correct");
                    document.getElementById("pais-msg").innerText = '✔ País seleccionado';
                    document.getElementById("pais-control").classList.remove("control-error");
                    document.getElementById("pais-control").classList.add("control-correct");
                    campos["pais"] = true;                                                              // Indica que pasó la validación.
                } else {
                    document.getElementById("pais-msg").classList.remove("input-correct");
                    document.getElementById("pais-msg").classList.add("input-error");
                    document.getElementById("pais-msg").innerText = '✘ Seleccione un país'
                    document.getElementById("pais-control").classList.remove("control-correct");
                    document.getElementById("pais-control").classList.add("control-error");
                    campos["pais"] = false;                                                             // Indica que nopasó la validación.
                };
                break;

            case "domicilio":
                if (document.getElementById("exp-domicilio") != null) {
                    document.getElementById("exp-domicilio").style.display = "none"                     // Elimino lo que venga de express-validator.
                };

                if (validacion.domicilio.test(input.value)) {
                    document.getElementById("domicilio-msg").classList.remove("input-error");
                    document.getElementById("domicilio-msg").classList.add("input-correct");
                    document.getElementById("domicilio-msg").innerText = '✔ Domicilio válido';
                    document.getElementById("domicilio-control").classList.remove("control-error");
                    document.getElementById("domicilio-control").classList.add("control-correct");
                    campos["domicilio"] = true;                                                         // Indica que pasó la validación.
                } else {
                    document.getElementById("domicilio-msg").classList.remove("input-correct");
                    document.getElementById("domicilio-msg").classList.add("input-error");
                    document.getElementById("domicilio-msg").innerText = '✘ Complete la calle y altura'
                    document.getElementById("domicilio-control").classList.remove("control-correct");
                    document.getElementById("domicilio-control").classList.add("control-error");
                    campos["domicilio"] = false;                                                        // Indica que no pasó la validación.
                };
                break;

            case "nacimiento":
                if (document.getElementById("exp-nacimiento") != null) {
                    document.getElementById("exp-nacimiento").style.display = "none"                    // Elimino lo que venga de express-validator.
                };

                if (validacion.nacimiento(input.value)) {
                    document.getElementById("nacimiento-msg").classList.remove("input-error");
                    document.getElementById("nacimiento-msg").classList.add("input-correct");
                    document.getElementById("nacimiento-msg").innerText = '✔ Fecha seleccionada';
                    document.getElementById("nacimiento-control").classList.remove("control-error");
                    document.getElementById("nacimiento-control").classList.add("control-correct");
                    campos["nacimiento"] = true;                                                        // Indica que pasó la validación.
                } else {
                    document.getElementById("nacimiento-msg").classList.remove("input-correct");
                    document.getElementById("nacimiento-msg").classList.add("input-error");
                    document.getElementById("nacimiento-msg").innerText = '✘ Seleccione una fecha'
                    document.getElementById("nacimiento-control").classList.remove("control-correct");
                    document.getElementById("nacimiento-control").classList.add("control-error");
                    campos["nacimiento"] = false;                                                        // Indica que no pasó la validación.
                };
                break;

            case "email":
                if (document.getElementById("exp-email") != null) {
                    document.getElementById("exp-email").style.display = "none"                     // Elimino lo que venga de express-validator.
                };

                if (validacion.email.test(input.value)) {
                    document.getElementById("email-msg").classList.remove("input-error");
                    document.getElementById("email-msg").classList.add("input-correct");
                    document.getElementById("email-msg").innerText = '✔ Formato válido';
                    document.getElementById("email-control").classList.remove("control-error");
                    document.getElementById("email-control").classList.add("control-correct");
                    campos["email"] = true;                                                         // Indica que pasó la validación.
                } else {
                    document.getElementById("email-msg").classList.remove("input-correct");
                    document.getElementById("email-msg").classList.add("input-error");
                    document.getElementById("email-msg").innerText = '✘ Formato incorrecto'
                    document.getElementById("email-control").classList.remove("control-correct");
                    document.getElementById("email-control").classList.add("control-error");
                    campos["email"] = false;                                                        // Indica que no pasó la validación.
                };
                break;

            case "password":
                if (input.value.length == 0) {
                    document.getElementById("password-msg").classList.remove("input-correct");
                    document.getElementById("password-msg").classList.remove("input-warning");
                    document.getElementById("password-msg").classList.add("input-error");
                    document.getElementById("password-msg").innerText = '✘ Completar contraseña'
                    document.getElementById("password-control").classList.remove("control-correct");
                    document.getElementById("password-control").classList.remove("control-warning");
                    document.getElementById("password-control").classList.add("control-error");
                    campos["password"] = false;                                                       // Indica que no pasó la validación.
                } else if (input.value.length > 0 && input.value.length <= 3) {
                    document.getElementById("password-msg").classList.remove("input-correct");
                    document.getElementById("password-msg").classList.remove("input-warning");
                    document.getElementById("password-msg").classList.add("input-error");
                    document.getElementById("password-msg").innerText = '!! Debil'
                    document.getElementById("password-control").classList.remove("control-correct");
                    document.getElementById("password-control").classList.remove("control-warning");
                    document.getElementById("password-control").classList.add("control-error");
                    campos["password"] = false;                                                       // Indica que no pasó la validación.
                } else if (input.value.length > 3 && input.value.length <= 5) {
                    document.getElementById("password-msg").classList.remove("input-error");
                    document.getElementById("password-msg").classList.remove("input-correct");
                    document.getElementById("password-msg").classList.add("input-warning");
                    document.getElementById("password-msg").innerText = '？ Media';
                    document.getElementById("password-control").classList.remove("control-error");
                    document.getElementById("password-control").classList.remove("control-correct");
                    document.getElementById("password-control").classList.add("control-warning");
                    campos["password"] = false;                                                       // Indica que no pasó la validación.
                } else {
                    document.getElementById("password-msg").classList.remove("input-error");
                    document.getElementById("password-msg").classList.remove("input-warning");
                    document.getElementById("password-msg").classList.add("input-correct");
                    document.getElementById("password-msg").innerText = '✔ Fuerte';
                    document.getElementById("password-control").classList.remove("control-error");
                    document.getElementById("password-control").classList.remove("control-warning");
                    document.getElementById("password-control").classList.add("control-correct");
                    campos["password"] = true;                                                        // Indica que pasó la validación.
                };
                break;
        };

        /* Cuento los errores si por lo menos submitié 1 vez */
        if (submits > 0) {
            let cantErrores = 0;                                        // Voy a contar los errores.
            for (let key in campos) {
                if (campos[key] == false) {
                    cantErrores += 1;
                    console.log("Problemas real-time con " + key);      // Debug personal.
                };
            };

            if (cantErrores > 0) {                                      // Pauso el envío si hay errores y muestro mensaje.
                errores.classList.remove("input-correct");
                errores.classList.add("input-error");
                errores.style.textAlign = "center";
                errores.style.marginBottom = "20px";
                errores.innerText = '✘ Hay ' + cantErrores + ' errores en el formulario, complételo y vuelva a intentarlo';
            } else {
                errores.classList.remove("input-error");
                errores.classList.add("input-correct");
                errores.style.textAlign = "center";
                errores.style.marginBottom = "20px";
                errores.innerText = '✔ No hay errores en el formulario';
            };
        };
    };

    /* Disparo EVENTOS -----------------------------------------------------------------------------------------------------------------------------------------------*/

    /* Valido inputs ------------------- EVENTOS */
    inputs.forEach((input) => {                                             // Si deseamos colocar algun comportamiento en agun input en particular podemos hacer: if (input.name == 'name_del_input')
        input.addEventListener("blur", function () { validaInput(this) });  // Para cuando salga del input. Debo pasarle así un pa´rametro al callback.
        input.addEventListener("input", function () { validaInput(this) }); // Para cada modificación del input, es mejor que los key...
    });

    /* Valido selects ------------------ EVENTOS */
    selects.addEventListener("blur", function () { validaInput(this) });
    selects.addEventListener("input", function () { validaInput(this) });  // Para que se corrija ni bien seleccione el pais, sino debe hacer blur para ver el cambio correcto.

    /* Valido checkbox ----------------- EVENTOS*/
    terminos.addEventListener("change", function () {                      // Si submiteo sin tildar, esto me permitirá tildarlo y sacarle el error.
        if (terminos.checked) {
            document.getElementById("terminos-msg").classList.remove("input-error");
            document.getElementById("terminos-msg").innerText = '';
        };
    })

    /* Valido formulario --------------- SUBMIT */
    formulario.addEventListener("submit", function (e) {

        submits += 1;

        if (!terminos.checked) {                                           // Si no está tildado genero mensaje de error.
            document.getElementById("terminos-msg").classList.add("input-error");
            document.getElementById("terminos-msg").innerText = '✘ Aceptar términos y condiciones';
            e.preventDefault();
        };

        /* Valido inputs ------------------- NO EVENTOS */
        inputs.forEach((input) => {
            validaInput(input);
        });

        /* Valido selects ------------------ NO EVENTOS */
        validaInput(selects);

        /* Cuento errores */
        let cantErrores = 0;                                        // Voy a contar los errores para pausar el envío.
        for (let key in campos) {
            if (campos[key] == false) {
                cantErrores += 1;
                console.log("Problemas en SUBMIT con " + key);      // Debug personal.
            };
        };

        if (cantErrores > 0) {                                      // Pauso el envío si hay errores y muestro mensaje.
            errores.classList.remove("input-correct");
            errores.classList.add("input-error");
            errores.style.textAlign = "center";
            errores.style.marginBottom = "20px";
            errores.innerText = '✘ Hay ' + cantErrores + ' errores en el formulario, complételo y vuelva a intentarlo';
            e.preventDefault();
        } else {
            errores.classList.remove("input-error");
            errores.classList.add("input-correct");
            errores.style.textAlign = "center";
            errores.style.marginBottom = "20px";
            errores.innerText = '✔ No hay errores en el formulario';
        };
    });
});