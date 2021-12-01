window.addEventListener("load", function () {

    /* Creo mi objeto de validaciones, algunas son expresiones regulares otras son funciones ----------------------------------------------------------------------*/
    const validaciones = {
        nombre: {
            expresion: /^[a-zA-ZÀ-ÿ\s]{1,45}$/,                 // Entre 1 y 45 caracteres. Sin simbolos espeicales.
            msgValidacionOk: '✔ Nombre válido',
            msgValidacionError: '✘ Entre 1-45 caracteres, no especiales'
        },

        apellido: {
            expresion: /^[a-zA-ZÀ-ÿ\s]{1,45}$/,                 // Entre 1 y 45 caracteres. Sin simbolos espeicales.
            msgValidacionOk: '✔ Apellido válido',
            msgValidacionError: '✘ Entre 1-45 caracteres, no especiales'
        },

        dni: {
            expresion: /^\d{8}(?:[-\s]\d{4})?$/,                // DNI de 8 dígitos.
            msgValidacionOk: '✔ DNI válido',
            msgValidacionError: '✘ 8 dígitos sin puntos'
        },

        pais: {
            expresion: (pais) => pais != '',                    // Función devuelve true o false.
            msgValidacionOk: '✔ País seleccionado',
            msgValidacionError: '✘ Seleccione un país'
        },

        domicilio: {
            expresion: /\w+\s\w+/,                              // Alfanumérico + alfanumérico (ya que no sabemos la estructura de las calles y alturas).
            msgValidacionOk: '✔ Domicilio válido',
            msgValidacionError: '✘ Complete la calle y altura'
        },

        nacimiento: {
            expresion: (nacimiento) => nacimiento != '',        // Función devuelve true o false.
            msgValidacionOk: '✔ Fecha seleccionada',
            msgValidacionError: '✘ Seleccione una fecha'
        },

        email: {
            expresion: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,      // Formato de email.
            msgValidacionOk: '✔ Formato válido',
            msgValidacionError: '✘ Formato incorrecto'
        },

        password: {
            expresion1: (password) => password.length == 0,     // Funciónes devuelven true o false.
            expresion2: (password) => (password.length > 0 && password.length <= 3),
            expresion3: (password) => (password.length > 3 && password.length <= 5),
            msgValidacionError1: '✘ Completar contraseña',
            msgValidacionError2: '!! Debil',
            msgValidacionError3: '？ Media',
            msgValidacionOk: '✔ Fuerte'
        }
    };

    /* Creo mi objeto de campos para indicar si hay errores en alguno ------------------------------------------------------------------------------------------------*/
    let campos = {};

    /* Voy a mostrar cantidad de errores luego del primer submit -----------------------------------------------------------------------------------------------------*/
    let submits = 0;

    /* Selecciono mis elementos que quiero validar -------------------------------------------------------------------------------------------------------------------*/
    let formulario = document.querySelector(".formulario");         // Selecciono el formulario.
    let inputs = document.querySelectorAll(".formulario input");    // Selecciono TODOS los inputs.
    let selects = document.querySelector("#pais-control")           // Selecciono el select ya que se comporta de otra forma.
    let terminos = document.querySelector("#terminos-control")      // Selecciono el terminos ya que tendrá otra lógica.
    let errores = document.getElementById("errores-msg");           // Selecciono este span para indicar errores.

    /* Este es el callback de los addEventListener de los elementos a validar ---------------------------------------------------------------------------------------*/
    function validaInput(input) {                                   // Por cada uno realizará una función. Recordar que es el callback del addEventListener que puede recibir el 'e'.
        switch (input.name) {                                       // OJO son los NAME del formulario, puedo cambiar el TODOS los e.target.name por this.name. Acá se pasó el this en la función.
            case "nombre":
            case "apellido":
            case "dni":
            case "domicilio":
            case "email":
                if (document.getElementById(`exp-${input.name}`) != null) {
                    document.getElementById(`exp-${input.name}`).style.display = "none"                 // Elimino lo que venga de express-validator.
                };

                if (validaciones[input.name].expresion.test(input.value)) {
                    document.getElementById(`${input.name}-msg`).classList.remove("input-error");
                    document.getElementById(`${input.name}-msg`).classList.add("input-correct");
                    document.getElementById(`${input.name}-msg`).innerText = validaciones[input.name].msgValidacionOk;
                    document.getElementById(`${input.name}-control`).classList.remove("control-error");
                    document.getElementById(`${input.name}-control`).classList.add("control-correct");
                    campos[input.name] = true;                                                          // Indica que pasó la validación.
                } else {
                    document.getElementById(`${input.name}-msg`).classList.remove("input-correct");
                    document.getElementById(`${input.name}-msg`).classList.add("input-error");
                    document.getElementById(`${input.name}-msg`).innerText = validaciones[input.name].msgValidacionError;
                    document.getElementById(`${input.name}-control`).classList.remove("control-correct");
                    document.getElementById(`${input.name}-control`).classList.add("control-error");
                    campos[input.name] = false;                                                         // Indica que no pasó la validación.
                };
                break;

            case "pais":
            case "nacimiento":
                if (document.getElementById(`exp-${input.name}`) != null) {
                    document.getElementById(`exp-${input.name}`).style.display = "none"                 // Elimino lo que venga de express-validator.
                };

                if (validaciones.pais.expresion(input.value)) {
                    document.getElementById(`${input.name}-msg`).classList.remove("input-error");
                    document.getElementById(`${input.name}-msg`).classList.add("input-correct");
                    document.getElementById(`${input.name}-msg`).innerText = validaciones[input.name].msgValidacionOk;
                    document.getElementById(`${input.name}-control`).classList.remove("control-error");
                    document.getElementById(`${input.name}-control`).classList.add("control-correct");
                    campos[input.name] = true;                                                          // Indica que pasó la validación.
                } else {
                    document.getElementById(`${input.name}-msg`).classList.remove("input-correct");
                    document.getElementById(`${input.name}-msg`).classList.add("input-error");
                    document.getElementById(`${input.name}-msg`).innerText = validaciones[input.name].msgValidacionError;
                    document.getElementById(`${input.name}-control`).classList.remove("control-correct");
                    document.getElementById(`${input.name}-control`).classList.add("control-error");
                    campos[input.name] = false;                                                         // Indica que no pasó la validación.
                };
                break;

            case "password":                                                                            // No elimino lo que viene de express-validator ya que se borra su estado.
                if (validaciones[input.name].expresion1(input.value)) {
                    document.getElementById(`${input.name}-msg`).classList.remove("input-correct", "input-warning");
                    document.getElementById(`${input.name}-msg`).classList.add("input-error");
                    document.getElementById(`${input.name}-msg`).innerText = validaciones[input.name].msgValidacionError1;
                    document.getElementById(`${input.name}-control`).classList.remove("control-correct", "control-warning");
                    document.getElementById(`${input.name}-control`).classList.add("control-error");
                    campos[input.name] = false;                                                         // Indica que no pasó la validación.
                } else if (validaciones[input.name].expresion2(input.value)) {
                    document.getElementById(`${input.name}-msg`).classList.remove("input-correct", "input-warning");
                    document.getElementById(`${input.name}-msg`).classList.add("input-error");
                    document.getElementById(`${input.name}-msg`).innerText = validaciones[input.name].msgValidacionError2;
                    document.getElementById(`${input.name}-control`).classList.remove("control-correct", "control-warning");
                    document.getElementById(`${input.name}-control`).classList.add("control-error");
                    campos[input.name] = false;                                                         // Indica que no pasó la validación.
                } else if (validaciones[input.name].expresion3(input.value)) {
                    document.getElementById(`${input.name}-msg`).classList.remove("input-error", "input-correct");
                    document.getElementById(`${input.name}-msg`).classList.add("input-warning");
                    document.getElementById(`${input.name}-msg`).innerText = validaciones[input.name].msgValidacionError3;
                    document.getElementById(`${input.name}-control`).classList.remove("control-error", "control-correct");
                    document.getElementById(`${input.name}-control`).classList.add("control-warning");
                    campos[input.name] = false;                                                         // Indica que no pasó la validación.
                } else {
                    document.getElementById(`${input.name}-msg`).classList.remove("input-error", "input-warning");
                    document.getElementById(`${input.name}-msg`).classList.add("input-correct");
                    document.getElementById(`${input.name}-msg`).innerText = validaciones[input.name].msgValidacionOk;
                    document.getElementById(`${input.name}-control`).classList.remove("control-error", "control-warning");
                    document.getElementById(`${input.name}-control`).classList.add("control-correct");
                    campos[input.name] = true;                                                          // Indica que pasó la validación.
                };
                break;
        };

        /* Cuento los errores si por lo menos submitié 1 vez */
        if (submits > 0) {
            let cantErrores = 0;                                        // Voy a contar los errores.
            for (let key in campos) {
                if (campos[key] == false) {
                    cantErrores += 1;
                    //console.log("Problemas EVENTOS con " + key);        // Debug personal.
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
    inputs.forEach((input) => {                                             // Si deseamos colocar algun comportamiento en algun input en particular podemos hacer: if (input.name == 'name_del_input')
        input.addEventListener("blur", function () { validaInput(this) });  // Para cuando salga del input. Debo pasarle así un parámetro al callback.
        input.addEventListener("input", function () { validaInput(this) }); // Para cada modificación del input, es mejor que los key...
    });

    /* Valido selects ------------------ EVENTOS */
    selects.addEventListener("blur", function () { validaInput(this) });
    selects.addEventListener("input", function () { validaInput(this) });

    /* Valido checkbox ----------------- EVENTOS */
    terminos.addEventListener("change", function () {                       // Si submiteo sin tildar, esto me permitirá tildarlo y sacarle el error.
        if (terminos.checked) {
            document.getElementById("terminos-msg").classList.remove("input-error");
            document.getElementById("terminos-msg").innerText = '';
        };
    })

    /* Valido formulario --------------- SUBMIT */
    formulario.addEventListener("submit", function (e) {

        submits += 1;

        if (!terminos.checked) {                                             // Si no está tildado genero mensaje de error.
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
                //console.log("Problemas en SUBMIT con " + key);      // Debug personal.
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