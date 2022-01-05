import React from 'react';
import Header from './Header';
import SectionWrapper from './SectionWrapper';
import Footer from './Footer';

function Content() {                                          // Usamos Link para redireccionar a la ruta que queramos. Básicamente cambia la ruta en el navegador. Ahora con un Switch + Route podemos elegir qué renderizar leyendo esta ruta del navegador.
    return (
        <React.Fragment>
            {/* <!-- Contenido --> */}
            <main>

                <Header />

                <SectionWrapper />

                <Footer />

            </main>
            {/* <!-- /Contenido --> */}
        </React.Fragment>
    )
}

export default Content;