import React from 'react';
import { useEffect, useState } from 'react';                                                     // useState es para poder darle estados a los componentes FUNCIONALES (no de clase). useEffect es par poder manejar el ciclo de ida para componentes FUNCIOANLES y useRef sirve para seleccionar elementos del DOm muy parecido a los selectores de JS.

import Metric from './Metric';

function MetricWrapper() {

    /* Valores iniciales */
    const [products, setProducts] = useState();                                                  // useState genera un ARRAY de 2 posiciones. La 1° es una variable que tiene el valor definido. La 2° es una FUNCION que permitirá setear un nuevo valor a la variable anterior. En este caso lavarialbe tiene un array [].
    const [users, setUsers] = useState();
    const [categories, setCategories] = useState();
    const [campaigns, setCampaigns] = useState();

    /* DidMount pero con Hook. */
    useEffect(() => {                                                                            // Recibe un callback y un array de dependencias. El "DidMount" recibe SIEMPRE un array vacío, indicando que no mira ninguna dependencia/variable de seguimiento.
        console.log('%cSe montó el componente - DidMount', 'color: green');
        fetch('/api/products')                                                                   // Obtención de datos.
            .then(response => response.json())
            .then(data => {
                setProducts(data.meta.total)
            })
            .catch(error => console.log(error));

        fetch('/api/users')                                                                      // Obtención de datos.
            .then(response => response.json())
            .then(data => {
                setUsers(data.meta.total)
            })
            .catch(error => console.log(error));

        fetch('/api/categories')                                                                 // Obtención de datos.
            .then(response => response.json())
            .then(data => {
                setCategories(data.meta.total)
            })
            .catch(error => console.log(error));

        fetch('/api/campaigns')                                                                  // Obtención de datos.
            .then(response => response.json())
            .then(data => {
                setCampaigns(data.meta.total)
            })
            .catch(error => console.log(error));
    }, []);

    /* DidUpdate pero con Hook. */
    useEffect(() => {                                                                            // En este caso es importante PASARLE el array con dependencias, es decir a la variable que daremos seguimiento por si cambia de estado.
        console.log('%cSe actualizó el componente - DidUpdate', 'color: blue');
    }, [products, users, categories, campaigns]);                                                // SUPER IMPORTANTE, daremos seguimiento al estado de esta variable.

    /* WillUnmount pero con Hook. */
    useEffect(() => {                                                                            // En este caso es importante PASARLE el array con dependencias, es decir a la variable que daremos seguimiento por si cambia de estado.
        return () => console.log('%cSe desmontó el componente - WillUnmount', 'color: red');     // RETORNA UNA FUNCION SIEMPRE.
    }, []);                                                                                      // SUPER IMPORTANTE este array vacío

    /* Creo mi data para renderizar correctamente */
    let metricList = [
        { icon: "fa-guitar", name: "Producto", total: products },
        { icon: "fa-users", name: "Usuarios", total: users },
        { icon: "fa-puzzle-piece", name: "Categorias", total: categories },
        { icon: "fa-percentage", name: "Campañas", total: campaigns }
    ];

    /* Renderizo */
    return (
        <React.Fragment>
            {/* <!-- Seccion --> */}
            <section>

                <h3>Metricas</h3>
                <hr />
                <div className="container-metricas">
                    {metricList.map((item, i) => <Metric key={i} {...item} />)}
                </div>

            </section>
            {/* <!-- /Seccion --> */}
        </React.Fragment>
    )
}

export default MetricWrapper;