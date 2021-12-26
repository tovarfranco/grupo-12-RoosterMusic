window.addEventListener("load", function () {

    /* Creo mi objeto de validaciones, algunas son expresiones regulares otras son funciones ----------------------------------------------------------------------*/
    const validaciones = {
        nombre: {
            expresion: /^[a-zA-ZÀ-ÿ\s]{1,45}$/,                // Entre 1 y 45 caracteres. Sin simbolos especiales.
            msgValidacionOk: '✔ Nombre válido',
            msgValidacionError: '✘ Entre 1-45 caracteres, no especiales'
        },

        descripcion: {
            expresion: /^.{1,1000}$/,                          // Entre 1 y 1000 caracteres.
            msgValidacionOk: '✔ Descripción válida',
            msgValidacionError: '✘ Entre 1-1000 caracteres'
        },

        precio: {
            expresion: /^\d+((,|.)\d{1,2})?$/,                 // Formato 0.00 o 0,00.
            msgValidacionOk: '✔ Precio válido',
            msgValidacionError: '✘ Formato 0.00 o 0,00'
        },

        marca: {
            expresion: /^[a-zA-ZÀ-ÿ\s]{1,45}$/,                // Entre 1 y 45 caracteres.
            msgValidacionOk: '✔ Marca válido',
            msgValidacionError: '✘ Entre 1-45 caracteres'
        },

        modelo: {
            expresion: /^.{1,45}$/,                            // Entre 1 y 45 caracteres. Sin simbolos especiales.
            msgValidacionOk: '✔ Modelo válido',
            msgValidacionError: '✘ Entre 1-45 caracteres, no especiales'
        },

        categoria: {
            expresion: /^\d$/,                                 // Solo para verificar que no sea nulo.
            msgValidacionOk: '✔ Categoría seleccionada',
            msgValidacionError: '✘ Seleccione una categoría'
        },

        color: {
            expresion: /^[a-zA-ZÀ-ÿ\s]{1,45}$/,                // Entre 1 y 45 caracteres. Sin simbolos especiales.
            msgValidacionOk: '✔ Color válido',
            msgValidacionError: '✘ Entre 1-45 caracteres, no especiales'
        },

        material: {
            expresion: /^[a-zA-ZÀ-ÿ\s]{1,45}$/,                // Entre 1 y 45 caracteres. Sin simbolos especiales.
            msgValidacionOk: '✔ Material válido',
            msgValidacionError: '✘ Entre 1-45 caracteres, no especiales'
        },

        origen: {
            expresion: /^[a-zA-ZÀ-ÿ\s]{1,45}$/,                // Entre 1 y 45 caracteres. Sin simbolos especiales.
            msgValidacionOk: '✔ Origen válido',
            msgValidacionError: '✘ Entre 1-45 caracteres, no especiales'
        },

        anio: {
            expresion: /^\d\d\d\d$/,                           // Formato YYYY.
            msgValidacionOk: '✔ Año válido',
            msgValidacionError: '✘ 4 dígitos'
        },

        disponibilidad: {
            expresion: /^[a-zA-ZÀ-ÿ\s]{1,45}$/,                // Entre 1 y 45 caracteres. Sin simbolos especiales.
            msgValidacionOk: '✔ Disponibilidad seleccionada',
            msgValidacionError: '✘ Seleccione disponibilidad'
        },

        campania: {
            expresion: /^\d$/,                                 // Solo para verificar que no sea nulo.
            msgValidacionOk: '✔ Campaña seleccionada',
            msgValidacionError: '✘ Seleccione una campaña'
        }
    };

    /* Creo mi objeto de campos para indicar si hay errores en alguno ------------------------------------------------------------------------------------------------*/
    let campos = {};

    /* Voy a mostrar cantidad de errores luego del primer submit -----------------------------------------------------------------------------------------------------*/
    let submits = 0;

    /* Selecciono mis elementos que quiero validar -------------------------------------------------------------------------------------------------------------------*/
    let formulario = document.querySelector(".formulario");         // Selecciono el formulario.
    let inputs = document.querySelectorAll(".formulario input");    // Selecciono TODOS los inputs.
    let selects = document.querySelectorAll("select")               // Selecciono los select ya que se comportan de otra forma.
    let errores = document.getElementById("errores-msg");           // Selecciono este span para indicar errores.

    /* Este es el callback de los addEventListener de los elementos a validar ---------------------------------------------------------------------------------------*/
    function validaInput(input) {                                   // Por cada uno realizará una función. Recordar que es el callback del addEventListener que puede recibir el 'e'.

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
    inputs.forEach((input) => {
        if (input.name != 'img') {                                              // Se rompe con este input (no usamos un switch en la validación). Si deseamos colocar algun comportamiento en algun input en particular podemos hacer: if (input.name == 'name_del_input')
            input.addEventListener("blur", function () { validaInput(this) });  // Para cuando salga del input. Debo pasarle así un parámetro al callback.
            input.addEventListener("input", function () { validaInput(this) }); // Para cada modificación del input, es mejor que los key...
        }
    });

    /* Valido selects ------------------ EVENTOS */
    selects.forEach((select) => {                                            // Si deseamos colocar algun comportamiento en algun select en particular podemos hacer: if (select.name == 'name_del_select')
        select.addEventListener("blur", function () { validaInput(this) });  // Para cuando salga del select. Debo pasarle así un parámetro al callback.
        select.addEventListener("input", function () { validaInput(this) }); // Para cada modificación del select, es mejor que los key...
    });

    /* Valido formulario --------------- SUBMIT */
    formulario.addEventListener("submit", function (e) {

        submits += 1;

        /* Valido inputs ------------------- NO EVENTOS */
        inputs.forEach((input) => {
            if (input.name != 'img') {
                validaInput(input);
            }
        });

        /* Valido selects ------------------ NO EVENTOS */
        selects.forEach((select) => {
            validaInput(select);
        });

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