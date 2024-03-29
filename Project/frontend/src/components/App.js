// Este App.js es un COMPONENTE, puede tener su propio css y su lógica. En sí un COMPONENTE es una función que retorna un bloque de HTML. Tenemos componentes de CLASE y FUNCIONALES, cada uno tienes sus diferencias.       

import React from 'react';
import { Route, Routes } from 'react-router-dom';               // Para poder utilizar el Switch (AHORA llamado Routes) y Route para renderizar solamente el componente indicado por la ruta del navegador.

import Sidebar from './Sidebar';                                // Se importa este COMPONENTE.
import Content from './Content';                                // Se importa este COMPONENTE.
import Login from './Login';                                    // Se importa este COMPONENTE.

function App() {                                                // Como dijimos básicamente el componente es una función (en este caso es componente FUNCIONAL)
    return (                                                    // Debe retornar un solo bloque de código HTML. Esto es JSX: los class ahora son className, deben CERRARSE todas las etiquetas, se debe importar las imágenes para usarlas. VER QUE LOS COMPONENTES importados se usan como si fueran etiquetas HTML.
                                                                // Super importante el ruteo. Ver que uso /* que indica que dentro habrá SUBRUTAS.
        <React.Fragment>
            {/* <!-- Contenedor total --> */}
            <div className="contenedor-tablero">

                <Routes>
                    <Route path="/" element={<Login />} />

                    <Route path="/dashboard/*" element={
                        <>
                            <Sidebar />
                            <Content />
                        </>
                    } />
                </Routes>

            </div>
            {/* <!-- /Contenedor total --> */}
        </React.Fragment>
    );
}

// Pensándolo de otra forma PARECE ser como EJS, donde se usa JS para variables, etc y además las particiones que hacíamos de las vistas para reutilizar bloques HTML.

export default App;                                             // Siempre exportarlo de esta manera.