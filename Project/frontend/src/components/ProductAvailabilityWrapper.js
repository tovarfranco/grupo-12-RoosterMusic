import React from 'react';

function ProductAvailabilityWrapper() {
    return (
        <React.Fragment>
            {/* <!-- Seccion 3 --> */}
            <section>
                <h3>Productos por disponibilidad</h3>
                <hr />
                <div class="container-metricas">
                    <article class="metrica">
                        <div class="metrica-descripcion">
                            <h3 class="texto-titulo-metrica">En STOCK</h3>
                            <h4 class="texto-descripcion-metrica">15</h4>
                        </div>
                    </article>
                    <article class="metrica">
                        <div class="metrica-descripcion">
                            <h3 class="texto-titulo-metrica">Sin STOCK</h3>
                            <h4 class="texto-descripcion-metrica">200</h4>
                        </div>
                    </article>
                </div>
            </section>
            {/* <!-- /Seccion 3 --> */}
        </React.Fragment>
    )
}

export default ProductAvailabilityWrapper;