import React from 'react';
import producto from '../assets/images/audio1.jpg';                // Las imágenes debe ser importadas para poder utilizarlas.
import usuario from '../assets/images/avatar.jpg';                 // Las imágenes debe ser importadas para poder utilizarlas.

function LastModifiedWrapper() {
    return (
        <React.Fragment>
            {/* <!-- Seccion 3 --> */}
            <section>
                <h3>Ultimos creados</h3>
                <hr />
                <div className="container-modificaciones">
                    <article className="modificacion">
                        <div className="modificacion-imagen"><img src={producto} alt="audio" /></div>
                        <hr />
                        <div className="modificacion-descripcion">
                            <h3 className="texto-titulo-modificacion">Winco</h3>
                            <h4 className="texto-descripcion-modificacion">Reproductor de Vinilos Winco</h4>
                            <h4 className="texto-descripcion-modificacion">U$S 100.00</h4>
                        </div>
                    </article>
                    <article className="modificacion">
                        <div className="modificacion-imagen"><img src={usuario} alt="Guitarra" /></div>
                        <hr />
                        <div className="modificacion-descripcion">
                            <h3 className="texto-titulo-modificacion">Franco Ruben</h3>
                            <h4 className="texto-descripcion-modificacion">Argentina</h4>
                            <h4 className="texto-descripcion-modificacion">Nacimiento: 09/10/1995</h4>
                        </div>
                    </article>
                </div>
            </section>
            {/* <!-- /Seccion 3 --> */}
        </React.Fragment>
    )
}

export default LastModifiedWrapper;