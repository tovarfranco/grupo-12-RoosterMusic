import React from 'react';

function UserCountryWrapper() {
    return (
        <React.Fragment>
            {/* <!-- Seccion 3 --> */}
                    <section>
                        <h3>Usuarios por paises</h3>
                        <hr />
                        <div className="container-metricas">
                            <article className="metrica">
                                <div className="metrica-descripcion">
                                    <h3 className="texto-titulo-metrica">Argentina</h3>
                                    <h4 className="texto-descripcion-metrica">15</h4>
                                </div>
                            </article>
                            <article className="metrica">
                                <div className="metrica-descripcion">
                                    <h3 className="texto-titulo-metrica">Brasil</h3>
                                    <h4 className="texto-descripcion-metrica">200</h4>
                                </div>
                            </article>
                            <article className="metrica">
                                <div className="metrica-descripcion">
                                    <h3 className="texto-titulo-metrica">Colombia</h3>
                                    <h4 className="texto-descripcion-metrica">20</h4>
                                </div>
                            </article>
                        </div>
                    </section>
                    {/* <!-- /Seccion 3 --> */}
        </React.Fragment>
    )
}

export default UserCountryWrapper;