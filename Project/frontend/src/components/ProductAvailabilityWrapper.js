import React from 'react';
import { useEffect, useState } from 'react';                                                     // useState es para poder darle estados a los componentes FUNCIONALES (no de clase). useEffect es par poder manejar el ciclo de ida para componentes FUNCIOANLES y useRef sirve para seleccionar elementos del DOm muy parecido a los selectores de JS.

import Card from './Card';

function ProductAvailabilityWrapper() {

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

    /* Creo mi data para renderizar correctamente */
    /* Sumarizo (hago conteo) - Resultado es un objeto */
    let result = products.reduce((acc, { availability }) => (                                    // Destructuring.
        {
            ...acc,
            [availability]: (acc[availability] || 0) + 1
        }
    ), {})

    /* Paso mi resultado objeto a array de objetos */
    let arrayResult = Object.keys(result).map(key => (
        {
            name: key,
            total: `${result[key]}`
        }
    ))

    /* Renderizo */
    return (
        <React.Fragment>
            {/* <!-- Seccion 3 --> */}
            <section>
                <h3>Disponibilidad</h3>
                <hr />
                <div className="container-metricas">
                    {arrayResult.map((item, i) => <Card key={i} {...item} />)}
                </div>
            </section>
            {/* <!-- /Seccion 3 --> */}
        </React.Fragment>
    )
}

export default ProductAvailabilityWrapper;