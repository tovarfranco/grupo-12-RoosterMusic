import React from 'react';
import { useEffect, useState } from 'react';                                                     // useState es para poder darle estados a los componentes FUNCIONALES (no de clase). useEffect es par poder manejar el ciclo de ida para componentes FUNCIOANLES y useRef sirve para seleccionar elementos del DOm muy parecido a los selectores de JS.

import ProductList from './ProductList';

function ProductListWrapper() {

    /* Valores iniciales */
    const [products, setProducts] = useState([]);                                                // useState genera un ARRAY de 2 posiciones. La 1° es una variable que tiene el valor definido. La 2° es una FUNCION que permitirá setear un nuevo valor a la variable anterior. En este caso lavarialbe tiene un array [].

    /* DidMount pero con Hook. */
    useEffect(() => {                                                                            // Recibe un callback y un array de dependencias. El "DidMount" recibe SIEMPRE un array vacío, indicando que no mira ninguna dependencia/variable de seguimiento.
        console.log('%cSe montó el componente - DidMount', 'color: green');
        fetch('/api/products')                                                                   // Obtención de datos.
            .then(response => response.json())
            .then(data => {
                setProducts(data.data)
            })
            .catch(error => console.log(error));
    }, []);

    /* DidUpdate pero con Hook. */
    useEffect(() => {                                                                            // En este caso es importante PASARLE el array con dependencias, es decir a la variable que daremos seguimiento por si cambia de estado.
        console.log('%cSe actualizó el componente - DidUpdate', 'color: blue');
    }, [products]);                                                                              // SUPER IMPORTANTE, daremos seguimiento al estado de esta variable.

    /* WillUnmount pero con Hook. */
    useEffect(() => {                                                                            // En este caso es importante PASARLE el array con dependencias, es decir a la variable que daremos seguimiento por si cambia de estado.
        return () => console.log('%cSe desmontó el componente - WillUnmount', 'color: red');     // RETORNA UNA FUNCION SIEMPRE.
    }, []);                                                                                      // SUPER IMPORTANTE este array vacío

    /* Renderizo */
    return (
        <React.Fragment>
            {/* <!-- Seccion 2 --> */}
            <section>
                <h3>Listado de productos</h3>
                <hr />
                <div className="container-tabla">
                    <table role="table">
                        <thead>
                            <tr role="row">
                                <th role="columnheader">ID</th>
                                <th role="columnheader">Imagen</th>
                                <th role="columnheader">Nombre</th>
                                <th role="columnheader">Precio</th>
                                <th role="columnheader">Marca</th>
                                <th role="columnheader">Origen</th>
                                <th role="columnheader">Categoria</th>
                                <th role="columnheader">Campaña</th>
                                <th role="columnheader">Disponibilidad</th>
                                <th role="columnheader">URL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((item, i) => <ProductList key={i} {...item} />)}
                        </tbody>
                    </table>
                </div>
            </section>
            {/* <!-- /Seccion 2 --> */}
        </React.Fragment>
    )
}

export default ProductListWrapper;