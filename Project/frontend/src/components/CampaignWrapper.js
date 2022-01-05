import React from 'react';
import { useEffect, useState } from 'react';                                                       // useState es para poder darle estados a los componentes FUNCIONALES (no de clase). useEffect es par poder manejar el ciclo de ida para componentes FUNCIOANLES y useRef sirve para seleccionar elementos del DOm muy parecido a los selectores de JS.

import SmallCard from './SmallCard';

function CampaignWrapper() {

    /* Valores iniciales */
    const [campaigns, setCampaigns] = useState([]);                                                // useState genera un ARRAY de 2 posiciones. La 1° es una variable que tiene el valor definido. La 2° es una FUNCION que permitirá setear un nuevo valor a la variable anterior. En este caso lavarialbe tiene un array [].

    /* DidMount pero con Hook. */
    useEffect(() => {                                                                              // Recibe un callback y un array de dependencias. El "DidMount" recibe SIEMPRE un array vacío, indicando que no mira ninguna dependencia/variable de seguimiento.
        console.log('%cSe montó el componente - DidMount', 'color: green');
        fetch('/api/campaigns')                                                                    // Obtención de datos.
            .then(response => response.json())
            .then(data => {
                setCampaigns(data.data)
            })
            .catch(error => console.log(error));
    }, []);

    /* DidUpdate pero con Hook. */
    useEffect(() => {                                                                              // En este caso es importante PASARLE el array con dependencias, es decir a la variable que daremos seguimiento por si cambia de estado.
        console.log('%cSe actualizó el componente - DidUpdate', 'color: blue');
    }, [campaigns]);                                                                               // SUPER IMPORTANTE, daremos seguimiento al estado de esta variable.

    /* WillUnmount pero con Hook. */
    useEffect(() => {                                                                              // En este caso es importante PASARLE el array con dependencias, es decir a la variable que daremos seguimiento por si cambia de estado.
        return () => console.log('%cSe desmontó el componente - WillUnmount', 'color: red');       // RETORNA UNA FUNCION SIEMPRE.
    }, []);                                                                                        // SUPER IMPORTANTE este array vacío

    /* Renderizo */
    return (
        <React.Fragment>
            {/* <!-- Seccion 4 --> */}
            <section>
                <h3>Campañas disponibles</h3>
                <hr />
                <div className="container-boton-categorias">
                    {campaigns.map((item, i) => <SmallCard key={i} {...item} />)}
                </div>
            </section>
            {/* <!-- /Seccion 4 --> */}
        </React.Fragment>
    )
}

export default CampaignWrapper;