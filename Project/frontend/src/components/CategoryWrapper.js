import React from 'react';

function CategoryWrapper() {
    return (
        <React.Fragment>
            {/* <!-- Seccion 4 --> */}
            <section>
                <h3>Categorías disponibles</h3>
                <hr />
                <div className="container-boton-categorias">
                    <div className="boton-categoria"><button>Guitarras</button></div>
                    <div className="boton-categoria"><button>Bajos</button></div>
                    <div className="boton-categoria"><button>Baterías</button></div>
                    <div className="boton-categoria"><button>Ukelele</button></div>
                    <div className="boton-categoria"><button>Viento</button></div>
                    <div className="boton-categoria"><button>Audio</button></div>
                    <div className="boton-categoria"><button>Grabación</button></div>
                    <div className="boton-categoria"><button>Teclados</button></div>
                </div>
            </section>
            {/* <!-- /Seccion 4 --> */}
        </React.Fragment>
    )
}

export default CategoryWrapper;